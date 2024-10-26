import styled from 'styled-components';

export const Container = styled.div`
    flex-grow: 1;
    padding: 5vw;
    padding-top: max(52px, 5vw);
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 768px; // Increased from 512px
    width: 100%;
`;

export const PasteContainer = styled.div`
    color: #666;
    flex-grow: 1;
    font-size: 1.5rem;
    padding: 5vw 1vw;
    user-select: all;
    display: flex;
    justify-content: center;
`;

export const GhostWriter = styled.div`
    height: 100%;
    min-height: 100%;
    position: relative;
`;

export const GhostContent = styled.div`
    font-size: 1.5rem;
    left: 0;
    opacity: 0.33;
    padding: 1vw 1vw 25vw 1vw;
    pointer-events: all;
    position: absolute;
    right: 0;
    top: 0;
    user-select: none;
    white-space: pre-wrap;
    word-break: break-word;
    z-index: 1;
        
    span.word {
        cursor: pointer;
        position: relative;
        transition: all 0.2s ease;

        &:hover {
            text-decoration: underline;
            opacity: 0.8;
        }

        &:hover::after {
            content: "Skip to this word";
            position: absolute;
            bottom: calc(100% + 8px);
            left: 50%;
            transform: translateX(-50%);
            background: ${props => props.theme.backgroundColor};
            color: ${props => props.theme.foregroundColor};
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            white-space: nowrap;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            border: 1px solid ${props => props.theme.foregroundColor}20;
            backdrop-filter: blur(4px);
        }

        &:hover::before {
            content: "";
            position: absolute;
            bottom: calc(100% - 4px);
            left: 50%;
            transform: translateX(-50%) rotate(45deg);
            width: 8px;
            height: 8px;
            background: ${props => props.theme.backgroundColor};
            border-right: 1px solid ${props => props.theme.foregroundColor}20;
            border-bottom: 1px solid ${props => props.theme.foregroundColor}20;
            z-index: 1001;
        }
    }
`;

export const Writer = styled.div`
    display: inline-block;
    font-size: 1.5rem;
    outline: 0;
    padding: 1vw;
    white-space: pre-wrap;
    word-break: break-word;
    left: 0;
    top: 0;
    right: 0;
    position: absolute;
    z-index: 3;
`;

export const ErrorContent = styled.div`
    color: transparent;
    font-size: 1.5rem;
    left: 0;
    padding: 1vw;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    user-select: none;
    white-space: pre-wrap;
    word-break: break-word;
    z-index: 2;

    & span {
        border-bottom: 4px solid red;
    }
`;