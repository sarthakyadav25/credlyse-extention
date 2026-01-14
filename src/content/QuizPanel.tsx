import React, { useState } from 'react';

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
}

interface QuizPanelProps {
    videoTitle: string;
    onClose: () => void;
}

export function QuizPanel({ videoTitle, onClose }: QuizPanelProps): React.ReactElement {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
    const [isAdExpanded, setIsAdExpanded] = useState(true);
    const [score, setScore] = useState(0);

    // Demo questions - in real implementation, these would be fetched/generated
    const questions: Question[] = [
        {
            id: 1,
            question: "What is the main concept covered in this video?",
            options: [
                "Machine Learning basics",
                "The topic discussed in the video",
                "Web development",
                "Mobile app development"
            ],
            correctAnswer: 1
        },
        {
            id: 2,
            question: "Which key point was emphasized the most?",
            options: [
                "Speed of implementation",
                "Understanding core concepts",
                "Using specific tools",
                "All of the above"
            ],
            correctAnswer: 3
        },
        {
            id: 3,
            question: "What should you do after watching this video?",
            options: [
                "Just move to next video",
                "Practice what you learned",
                "Forget everything",
                "Skip the playlist"
            ],
            correctAnswer: 1
        }
    ];

    const handleAnswerSelect = (index: number) => {
        if (showResult) return;
        setSelectedAnswer(index);
    };

    const handleSubmit = () => {
        if (selectedAnswer === null) return;

        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
        setShowResult(true);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        }
    };

    const isLastQuestion = currentQuestion === questions.length - 1;
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;

    const renderSummary = () => (
        <div className="quiz-panel">
            <div className="quiz-header">
                <h2>Quiz Complete!</h2>
                <button className="quiz-close-btn" onClick={onClose}>✕</button>
            </div>

            <div className="quiz-summary-content">
                <div className="quiz-final-score">
                    <span className="score-label">Your Score</span>
                    <span className="score-value">{score}/{questions.length}</span>
                </div>

                <div className="sponsored-ad-card">
                    <div className="ad-banner"></div>
                    <div className="ad-header" onClick={() => setIsAdExpanded(!isAdExpanded)}>
                        <div className="ad-header-left">
                            <span className="replit-logo-small">R</span>
                            <div className="ad-header-text">
                                <span className="ad-title">Automatic software creator</span>
                                <span className="ad-subtitle">Sponsored • replit.com</span>
                            </div>
                        </div>
                        <button className={`ad-expand-btn ${isAdExpanded ? 'expanded' : ''}`}>
                            ▼
                        </button>
                    </div>

                    {isAdExpanded && (
                        <div className="ad-expanded-content">
                            <div className="ad-links-list">
                                <a href="https://replit.com/gallery" target="_blank" rel="noopener noreferrer" className="ad-link-item">
                                    <span className="ad-link-title">Replit Gallery</span>
                                    <span className="ad-link-desc">Get inspired by these neat ideas Boost your productivity</span>
                                </a>
                                <a href="https://replit.com/ai" target="_blank" rel="noopener noreferrer" className="ad-link-item">
                                    <span className="ad-link-title">AI Software Creator</span>
                                    <span className="ad-link-desc">Make apps with natural language AI makes ...</span>
                                    <span className="ad-link-arrow">↗</span>
                                </a>
                                <a href="https://replit.com" target="_blank" rel="noopener noreferrer" className="ad-link-item">
                                    <span className="ad-link-title">Replit</span>
                                    <span className="ad-link-desc">AI Builds It Automatically for You AI creates ...</span>
                                </a>
                                <a href="https://replit.com/pricing" target="_blank" rel="noopener noreferrer" className="ad-link-item">
                                    <span className="ad-link-title">Pricing</span>
                                    <span className="ad-link-desc">Build, deploy, and scale fast Get started now</span>
                                </a>
                            </div>

                            <a href="https://replit.com" target="_blank" rel="noopener noreferrer" className="ad-visit-btn">
                                Visit site
                            </a>
                        </div>
                    )}
                </div>
                <div className="ad-disclaimer">
                    Promoted by extension, not affiliated with YouTube or the creator
                </div>
            </div>
        </div>
    );

    return (
        <div className="quiz-panel-overlay">
            {showSummary ? renderSummary() : (
                <div className="quiz-panel">
                    <div className="quiz-header">
                        <div className="quiz-header-left">
                            <span className="quiz-icon">📝</span>
                            <h2>Quiz: {videoTitle}</h2>
                        </div>
                        <button className="quiz-close-btn" onClick={onClose}>✕</button>
                    </div>

                    <div className="quiz-progress">
                        <div className="quiz-progress-text">
                            Question {currentQuestion + 1} of {questions.length}
                        </div>
                        <div className="quiz-progress-bar">
                            <div
                                className="quiz-progress-fill"
                                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className="quiz-content">
                        <h3 className="quiz-question">{questions[currentQuestion].question}</h3>

                        <div className="quiz-options">
                            {questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`quiz-option ${selectedAnswer === index ? 'selected' : ''} ${showResult
                                        ? index === questions[currentQuestion].correctAnswer
                                            ? 'correct'
                                            : selectedAnswer === index
                                                ? 'incorrect'
                                                : ''
                                        : ''
                                        }`}
                                    onClick={() => handleAnswerSelect(index)}
                                    disabled={showResult}
                                >
                                    <span className="quiz-option-letter">{String.fromCharCode(65 + index)}</span>
                                    <span className="quiz-option-text">{option}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {showResult && (
                        <div className={`quiz-result ${isCorrect ? 'correct' : 'incorrect'}`}>
                            {isCorrect ? '✓ Correct!' : '✗ Incorrect. The correct answer is highlighted.'}
                        </div>
                    )}

                    <div className="quiz-actions">
                        {!showResult ? (
                            <button
                                className="quiz-submit-btn"
                                onClick={handleSubmit}
                                disabled={selectedAnswer === null}
                            >
                                Submit Answer
                            </button>
                        ) : isLastQuestion ? (
                            <div className="quiz-complete">
                                <button className="quiz-finish-btn" onClick={() => setShowSummary(true)}>
                                    View Results
                                </button>
                            </div>
                        ) : (
                            <button className="quiz-next-btn" onClick={handleNext}>
                                Next Question →
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
