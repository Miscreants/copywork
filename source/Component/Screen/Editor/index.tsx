import { memo, useRef, useState, RefObject, useEffect } from 'react';
import { useStoreon } from 'storeon/react';
import { useParams, useNavigate } from 'react-router';
import styled from 'styled-components';

import { posts } from 'data/posts';
import { useEditorEvents } from './hooks/useEditorEvents';
import { Container, Content, Writer, ErrorContent, GhostContent, GhostWriter } from './styles';
import { wrapWordsInSpans } from './utils';

const PostsById = posts.reduce((obj, post) => {
    obj[post.id] = post;
    return obj;
}, {});

const EditorScreen = memo(function EditorScreen(): JSX.Element {
    const writerRef: RefObject<HTMLDivElement> = useRef();
    const errorRef: RefObject<HTMLDivElement> = useRef();
    const ghostRef: RefObject<HTMLDivElement> = useRef();
    const navigate = useNavigate();

    const { id } = useParams();
    const { settings = {} } = useStoreon('settings');
    const [contentToCopy, setContentToCopy] = useState<string | undefined>(undefined);

    const resetEditor = () => {
        if (writerRef.current) writerRef.current.innerHTML = '';
        if (errorRef.current) errorRef.current.innerHTML = '';
        setTimeout(() => writerRef.current?.focus(), 100);
    };

    const startNewDocument = () => {
        setContentToCopy(undefined);
        navigate('/playground', { replace: true });
    };

    useEffect(() => {
        if (id) {
            const post = PostsById[id];
            if (!post) {
                setContentToCopy(undefined);
                return;
            }

            const postContent = post.content
                .replace(/ +/g, ' ')
                .replace(/\t/g, '')
                .replace(/\r/g, '')
                .replace(/\n{1,}/g, '\n\n')
                .trim();
            setContentToCopy(postContent);
        } else {
            setContentToCopy(undefined);
        }

        resetEditor();
    }, [id]);

    useEffect(() => {
        if (contentToCopy && ghostRef.current) {
            ghostRef.current.innerHTML = wrapWordsInSpans(contentToCopy);
        }
    }, [contentToCopy]);

    useEditorEvents(
        contentToCopy, 
        setContentToCopy, 
        writerRef, 
        errorRef, 
        settings
    );

    return (
        <Container>
            <Content>
                {contentToCopy ? (
                    <>
                        <EditorHeader>
                            <EditorActions>
                                <ActionButton onClick={startNewDocument}>
                                    + New Document
                                </ActionButton>
                                <ActionButton onClick={resetEditor}>
                                    ↺ Reset
                                </ActionButton>
                            </EditorActions>
                        </EditorHeader>
                        <GhostWriter>
                            <Writer
                                contentEditable
                                spellCheck={settings.spellcheck ? 'true' : 'false'}
                                ref={writerRef}
                                data-editor={true}
                            />
                            <ErrorContent ref={errorRef} />
                            <GhostContent ref={ghostRef} />
                        </GhostWriter>
                    </>
                ) : (
                    <CustomPracticeContainer>
                        <CustomPracticeTitle>Custom Practice</CustomPracticeTitle>
                        
                        <CustomPracticeInstructions>
                            <p>
                                Paste any text you'd like to practice with. This could be:
                            </p>
                            <SuggestionsList>
                                <Suggestion>
                                    <SuggestionIcon>📝</SuggestionIcon>
                                    <SuggestionText>
                                        Blog posts you admire
                                    </SuggestionText>
                                </Suggestion>
                                <Suggestion>
                                    <SuggestionIcon>✍️</SuggestionIcon>
                                    <SuggestionText>
                                        Writing styles you want to learn
                                    </SuggestionText>
                                </Suggestion>
                                <Suggestion>
                                    <SuggestionIcon>📚</SuggestionIcon>
                                    <SuggestionText>
                                        Book excerpts or articles
                                    </SuggestionText>
                                </Suggestion>
                                <Suggestion>
                                    <SuggestionIcon>💼</SuggestionIcon>
                                    <SuggestionText>
                                        Professional content you need to master
                                    </SuggestionText>
                                </Suggestion>
                            </SuggestionsList>

                            <Instructions>
                                <InstructionsTitle>How to start:</InstructionsTitle>
                                <InstructionsList>
                                    <Instruction>1. Copy your chosen text</Instruction>
                                    <Instruction>2. Paste it here (Ctrl/Cmd + V)</Instruction>
                                    <Instruction>3. Begin typing to practice</Instruction>
                                </InstructionsList>
                            </Instructions>
                        </CustomPracticeInstructions>
                    </CustomPracticeContainer>
                )}
            </Content>
        </Container>
    );
});

export default EditorScreen;

const EditorHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
`;

const EditorActions = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const ActionButton = styled.button`
    background: ${props => props.theme.sidebarBackgroundColor};
    border: 1px solid ${props => props.theme.foregroundColor}20;
    border-radius: 4px;
    color: ${props => props.theme.foregroundColor};
    cursor: pointer;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    transition: all 0.2s ease;

    &:hover {
        background: ${props => props.theme.foregroundColor}10;
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }
`;

const CustomPracticeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background: ${props => props.theme.sidebarBackgroundColor};
    border-radius: 12px;
    margin-top: 2rem;
`;

const CustomPracticeTitle = styled.h1`
    font-size: 2rem;
    margin: 0 0 2rem 0;
    color: ${props => props.theme.foregroundColor};
`;

const CustomPracticeInstructions = styled.div`
    max-width: 600px;
    width: 100%;
    text-align: center;

    p {
        font-size: 1.1rem;
        margin: 0 0 2rem 0;
        opacity: 0.9;
    }
`;

const SuggestionsList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
`;

const Suggestion = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    background: ${props => props.theme.backgroundColor};
    border-radius: 8px;
    transition: transform 0.2s ease;

    &:hover {
        transform: translateY(-2px);
    }
`;

const SuggestionIcon = styled.span`
    font-size: 1.5rem;
    margin-right: 1rem;
`;

const SuggestionText = styled.span`
    font-size: 1rem;
    text-align: left;
`;

const Instructions = styled.div`
    text-align: left;
    padding: 1.5rem;
    background: ${props => props.theme.backgroundColor};
    border-radius: 8px;
    margin-top: 1rem;
`;

const InstructionsTitle = styled.h2`
    font-size: 1.2rem;
    margin: 0 0 1rem 0;
    color: ${props => props.theme.foregroundColor};
`;

const InstructionsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Instruction = styled.div`
    font-size: 1rem;
    opacity: 0.9;
`;