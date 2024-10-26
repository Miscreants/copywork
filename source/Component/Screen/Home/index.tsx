import { memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { showPassages } from 'store/action/passages';

import NewDocumentIcon from 'Component/Icon/NewDocument';
import SquaresIcon from 'Component/Icon/Squares';

import Menu from 'Component/Menu';
import MenuLink from 'Component/MenuLink';
import MenuButton from 'Component/MenuButton';

const HomeScreen = memo(function HomeScreen(): JSX.Element {
    return (
        <Container>
            <Content>
                <Title>Welcome to Copywork</Title>

                <Copy>
                    <Paragraph>
                        Improve your writing and typing skills by practicing copying high-quality essays, blog posts, and other think pieces. This tool helps you internalize their writing style, pacing, and structure through deliberate practice.
                    </Paragraph>

                    <Features>
                        <Feature>
                            <FeatureTitle>🎯 Focused Practice</FeatureTitle>
                            <FeatureDescription>
                                Type through carefully selected essays from popular writers like Jason Cohen, Lulu Cheng Meservey, Lenny Rachistsky, and more.
                            </FeatureDescription>
                        </Feature>

                         <Feature>
                            <FeatureTitle>📝 Autocomplete & Spellcheck</FeatureTitle>
                            <FeatureDescription>
                                Focus on the writing style, not the typos. Errors get autocorrected so you can keep the flow going.
                            </FeatureDescription>
                        </Feature>

                        <Feature>
                            <FeatureTitle>📝 Real-time Feedback</FeatureTitle>
                            <FeatureDescription>
                                Get immediate visual feedback on your accuracy with inline error highlighting.
                            </FeatureDescription>
                        </Feature>

                        <Feature>
                            <FeatureTitle>🔄 Spaced Repetition</FeatureTitle>
                            <FeatureDescription>
                                Practice regularly with different posts to internalize various writing styles and improve retention.
                            </FeatureDescription>
                        </Feature>
                    </Features>

                    <Paragraph>
                        Get started by choosing a post from our curated library or paste your own text to practice with.
                    </Paragraph>
                </Copy>

                <Menu>
                    <MenuLink>
                        <MenuButton onClick={showPassages}>
                            <SquaresIcon /> Browse Practice Library
                        </MenuButton>
                    </MenuLink>
                    <MenuLink>
                        <Link to="/playground">
                            <NewDocumentIcon /> Create Custom Practice
                        </Link>
                    </MenuLink>
                </Menu>

                <Footer>
                    <FooterNote>
                        All practice posts are used for educational purposes and link back to their original sources.
                    </FooterNote>
                </Footer>
            </Content>
        </Container>
    );
});

export default HomeScreen;

const Container = styled.div`
    flex-grow: 1;
    padding: 5vw;
    padding-top: max(52px, 5vw);
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 768px;
    width: 100%;
`;

const Title = styled.h1`
    font-size: 2rem;
    margin: 0 0 1.5rem 0;
    color: ${props => props.theme.foregroundColor};
`;

const Copy = styled.div`
    margin-bottom: 2rem;
`;

const Paragraph = styled.p`
    margin: 0;
    line-height: 1.6;
    font-size: 1.1rem;

    & + & {
        margin-top: 1rem;
    }
`;

const Features = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
`;

const Feature = styled.div`
    padding: 1.5rem;
    background: ${props => props.theme.sidebarBackgroundColor};
    border-radius: 8px;
    transition: transform 0.2s ease;

    &:hover {
        transform: translateY(-2px);
    }
`;

const FeatureTitle = styled.h3`
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
    color: ${props => props.theme.foregroundColor};
`;

const FeatureDescription = styled.p`
    margin: 0;
    font-size: 1rem;
    line-height: 1.5;
    opacity: 0.9;
`;

const Footer = styled.footer`
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid ${props => props.theme.foregroundColor}20;
`;

const FooterNote = styled.p`
    font-size: 0.9rem;
    opacity: 0.7;
    text-align: center;
    margin: 0;
`;