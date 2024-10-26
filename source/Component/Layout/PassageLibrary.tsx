import { memo, RefObject, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import styled from 'styled-components';
import sortBy from 'lodash/sortBy';

import { hidePassages } from 'store/action/passages';
import { posts } from 'data/posts';
import { Post } from 'data/types';

import LeftArrowIcon from 'Component/Icon/LeftArrow';
import EyeglassIcon from 'Component/Icon/Eyeglass';

import MenuButton from 'Component/MenuButton';
import Section from 'Component/Section';

type PostsByKey = Record<string, Post[]>;

const PassageLibrary = memo(function PassageLibrary(): JSX.Element {
    const { passages_show: passagesShow } = useStoreon('passages_show');
    const containerRef: RefObject<HTMLDivElement> = useRef();

    const [searchTermsRaw, setSearchTermsRaw] = useState('' as string);
    const [collapsedCategory, setCollapsedCategory] = useState({} as GenericObject);

    const searchTerms =
        searchTermsRaw.length > 0
            ? (searchTermsRaw || '').toLocaleLowerCase().trim().split(/\ +/g)
            : undefined;

    const filteredPosts = posts.filter(post => {
        if (!searchTerms) return true;
        
        return searchTerms.every(term => 
            post.author.toLowerCase().includes(term) ||
            post.title.toLowerCase().includes(term)
        );
    });

    const organizedPosts = filteredPosts.reduce<PostsByKey>((acc, post) => {
        const key = post.author;
        if (!acc[key]) acc[key] = [];
        acc[key].push(post);
        return acc;
    }, {});

    const sections = Object.keys(organizedPosts).sort();
    sections.forEach(key => {
        organizedPosts[key] = sortBy(organizedPosts[key], ['title']);
    });

    return (
        <Container
            hide={!passagesShow}
            onClick={(e) => {
                if (e.target !== containerRef.current) return;
                hidePassages();
            }}
            ref={containerRef}
        >
            <Content>
                <Section>
                    <CloseButton>
                        <MenuButton onClick={hidePassages}>
                            <LeftArrowIcon /> PRACTICE LIBRARY
                        </MenuButton>
                    </CloseButton>
                </Section>

                <Section>
                    <SearchContainer>
                        <SearchInput>
                            <EyeglassIcon />
                            <input
                                type="search"
                                placeholder="Search..."
                                value={searchTermsRaw}
                                onChange={(e) => setSearchTermsRaw(e.target.value)}
                                data-dontstealfocus="1"
                            />
                        </SearchInput>
                    </SearchContainer>
                </Section>

                <Section grow>
                    {sections.map((section) => {
                        const entries = organizedPosts[section] || [];
                        const isCollapsed = collapsedCategory[section];

                        return entries.length ? (
                            <Category key={section}>
                                <CategoryHeader
                                    collapsed={isCollapsed}
                                    onClick={() =>
                                        setCollapsedCategory((oldValue) => ({
                                            ...oldValue,
                                            [section]: !collapsedCategory[section],
                                        }))
                                    }
                                >
                                    <span>{section}</span>
                                    <PostCount>{entries.length} posts</PostCount>
                                    <LeftArrowIcon />
                                </CategoryHeader>
                                <CategoryEntries collapsed={isCollapsed}>
                                    {entries.map((entry) => (
                                        <Entry
                                            key={entry.id}
                                            to={`/playground/${entry.id}`}
                                            onClick={hidePassages}
                                        >
                                            <EntryTitle>{entry.title}</EntryTitle>
                                            <EntryMeta>
                                                <EntryCategory>
                                                    {entry.category}
                                                </EntryCategory>
                                                <EntryLink 
                                                    href={entry.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    onClick={e => e.stopPropagation()}
                                                >
                                                    Original Post ↗
                                                </EntryLink>
                                            </EntryMeta>
                                        </Entry>
                                    ))}
                                </CategoryEntries>
                            </Category>
                        ) : null;
                    })}
                </Section>
            </Content>
        </Container>
    );
});

export default PassageLibrary;

const Container = styled.div.attrs((props: GenericObject) => ({ hide: props.hide }))`
    bottom: 0;
    left: ${(props) => (props.hide ? '333px' : '0')};
    opacity: ${(props) => (props.hide ? '0' : '1')};
    pointer-events: ${(props) => (props.hide ? 'none' : 'all')};
    position: fixed;
    right: ${(props) => (props.hide ? '-333px' : '0')};
    top: 0;
    user-select: none;
    z-index: 1000;
`;

const Content = styled.div`
    background: ${(props) => props.theme.sidebarBackgroundColor};
    color: ${(props) => props.theme.foregroundColor};
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    overflow-y: auto;
    padding: 16px;
    width: 333px;
    height: 100%;
    margin-left: auto;
`;

const CloseButton = styled.div`
    align-items: center;
    cursor: pointer;
    display: flex;
    letter-spacing: 1px;

    & button {
        height: 100%;
    }

    & svg {
        height: 16px;
        margin-right: 8px;
    }
`;

const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const SearchInput = styled.div`
    align-items: center;
    background: ${(props) => props.theme.backgroundColor};
    border: 1px ${(props) => props.theme.foregroundColor} solid;
    border-radius: 4px;
    display: flex;
    height: 32px;
    position: relative;

    & svg {
        flex-shrink: 0;
        height: 16px;
        margin-left: 8px;
        pointer-events: none;
    }

    & input {
        appearance: none;
        background: transparent;
        caret-color: ${(props) => props.theme.foregroundColor};
        color: ${(props) => props.theme.foregroundColor};
        border: 0;
        flex-grow: 1;
        font-size: 1.1rem;
        height: 100%;
        left: 0;
        padding-left: 32px;
        position: absolute;
        top: 0;
        width: 100%;
    }
`;

const Category = styled.div`
    & + & {
        margin-top: 24px;
    }
`;

const CategoryHeader = styled.div.attrs((props: GenericObject) => ({
    collapsed: props.collapsed,
}))`
    align-items: center;
    display: flex;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    transition: background-color 0.2s ease;

    &:hover {
        background: ${props => props.theme.foregroundColor}10;
    }

    & span {
        flex-grow: 1;
        font-weight: 500;
    }

    & svg {
        flex-shrink: 0;
        flex-grow: 0;
        height: 16px;
        transform: rotate(${(props) => (props.collapsed ? '90deg' : '-90deg')});
        margin-left: 8px;
    }
`;

const PostCount = styled.span`
    font-size: 0.8rem;
    opacity: 0.6;
    margin-right: 8px;
`;

const CategoryEntries = styled.div.attrs((props: GenericObject) => ({
    collapsed: props.collapsed,
}))`
    display: flex;
    flex-direction: column;
    height: ${(props) => (props.collapsed ? '0' : '100%')};
    overflow: hidden;
    transition: height 250ms;
`;

const Entry = styled(Link)`
    display: flex;
    flex-direction: column;
    color: ${(props) => props.theme.foregroundColor};
    cursor: pointer;
    font-size: 1.1rem;
    padding: 12px 12px 12px 24px;
    position: relative;
    text-align: left;
    text-decoration: none;
    border-radius: 4px;
    margin: 2px 0;
    transition: background-color 0.2s ease;

    &:hover {
        background: ${props => props.theme.foregroundColor}10;
    }
`;

const EntryTitle = styled.span`
    font-size: 1rem;
    margin-bottom: 4px;
`;

const EntryMeta = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    opacity: 0.7;
`;

const EntryCategory = styled.span`
    font-style: italic;
`;

const EntryLink = styled.a`
    color: ${(props) => props.theme.foregroundColor};
    text-decoration: none;
    margin-left: 16px;
    
    &:hover {
        text-decoration: underline;
    }
`;