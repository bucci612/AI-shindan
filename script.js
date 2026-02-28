const questions = [
    {
        id: 1,
        text: "あなたの性格はどちらかというと？",
        options: [
            { text: "コツコツ作業を進めるのが好き", scores: { writer: 2, developer: 2, prompt: 1 } },
            { text: "新しいアイデアを出すのが好き", scores: { creator: 2, video: 1, prompt: 2 } }
        ]
    },
    {
        id: 2,
        text: "1日に副業に使える時間は？",
        options: [
            { text: "スキマ時間の1時間未満", scores: { creator: 2, writer: 1, prompt: 1 } },
            { text: "まとまった1時間以上", scores: { developer: 2, video: 2, writer: 1 } }
        ]
    },
    {
        id: 3,
        text: "パソコンやITツールの操作は得意ですか？",
        options: [
            { text: "あまり得意ではない・初心者", scores: { creator: 1, writer: 2 } },
            { text: "調べながらなら問題なく使える", scores: { developer: 2, prompt: 2, video: 2 } }
        ]
    },
    {
        id: 4,
        text: "どのような成果を求めますか？",
        options: [
            { text: "手堅く着実に稼ぎたい", scores: { writer: 2, developer: 1, video: 1 } },
            { text: "バズを狙って大きく稼ぎたい", scores: { creator: 2, video: 2, prompt: 1 } }
        ]
    },
    {
        id: 5,
        text: "どのように働くのが好きですか？",
        options: [
            { text: "完全に自分のペースで黙々と", scores: { creator: 2, writer: 2, developer: 1 } },
            { text: "クライアントの要望に応える形", scores: { developer: 2, video: 2, prompt: 2 } }
        ]
    }
];

const results = {
    creator: {
        title: "画像生成AIクリエイター",
        description: "あなたの想像力をAIで形にする仕事です。Midjourneyなどの画像生成AIを使い、SNSアイコンや挿絵、ストックフォトを作成。クリエイティブな作業が好きで、スキマ時間を活用したい方にぴったりです。",
        traits: [
            "アイデアを形にするのが好き",
            "SNSのトレンドに敏感",
            "スキマ時間で効率よく稼ぎたい"
        ]
    },
    writer: {
        title: "AIブログ・Webライター",
        description: "ChatGPT等を使って高品質な記事をスピーディに執筆する仕事です。従来のライティングよりも圧倒的に早く、稼げる額も大きくなりやすいのが特徴。コツコツ作業が得意な方におすすめです。",
        traits: [
            "文章を読んだり書いたりするのが苦にならない",
            "着実に確実な報酬を得たい",
            "自分のペースで黙々と作業したい"
        ]
    },
    video: {
        title: "AIショート動画編集者",
        description: "VrewやCapCutなどのAIツールを活用し、TikTokやYouTubeショートなどの動画を効率的に制作する仕事です。需要が爆発的に伸びており、バズを生み出す楽しさがあります。",
        traits: [
            "SNS（TikTok/YouTube等）をよく見る",
            "大きく稼ぐチャンスを狙いたい",
            "まとまった作業時間を確保できる"
        ]
    },
    prompt: {
        title: "プロンプトエンジニア",
        description: "AIから最高の回答を引き出す「指示文（プロンプト）」を作る仕事です。業務効率化を求める企業からの需要が高く、論理的思考とクリエイティビティの両方が活かせる注目の職種です。",
        traits: [
            "論理的に物事を考えるのが得意",
            "新しいITツールに興味がある",
            "クライアントの課題解決に貢献したい"
        ]
    },
    developer: {
        title: "AI・ノーコード開発者",
        description: "プログラミングの知識がなくても、AIコード生成やノーコードツールを使ってWebサイトやアプリを作る仕事です。単価が非常に高く、本格的なスキルを身につけたい方に最適です。",
        traits: [
            "ITリテラシーが高く学習意欲がある",
            "高単価な案件を獲得したい",
            "1日1時間以上のまとまった時間がとれる"
        ]
    }
};

let currentQuestionIndex = 0;
let userScores = {
    creator: 0,
    writer: 0,
    video: 0,
    prompt: 0,
    developer: 0
};

// DOM Elements
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const loadingScreen = document.getElementById('loading-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const optionsContainer = document.getElementById('options-container');
const questionText = document.getElementById('question-text');
const progressFill = document.getElementById('progress-fill');
const questionCounter = document.getElementById('question-counter');

// Event Listeners
startBtn.addEventListener('click', startDiagnosis);
restartBtn.addEventListener('click', resetDiagnosis);

// Functions
function switchScreen(hideScreen, showScreen) {
    hideScreen.classList.remove('active');
    setTimeout(() => {
        showScreen.classList.add('active');
    }, 300); // Wait for transition
}

function startDiagnosis() {
    currentQuestionIndex = 0;
    userScores = { creator: 0, writer: 0, video: 0, prompt: 0, developer: 0 };
    renderQuestion();
    switchScreen(startScreen, questionScreen);
}

function renderQuestion() {
    const q = questions[currentQuestionIndex];
    questionText.textContent = q.text;
    questionCounter.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
    
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = `${progressPercentage}%`;
    
    optionsContainer.innerHTML = '';
    
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        // Add subtle animation delay for options
        btn.style.animationDelay = `${index * 0.1}s`;
        btn.innerHTML = `<span>${option.text}</span>`;
        
        btn.addEventListener('click', () => handleOptionClick(option.scores));
        optionsContainer.appendChild(btn);
    });
}

function handleOptionClick(scores) {
    // Add up scores
    for (const [key, value] of Object.entries(scores)) {
        userScores[key] += value;
    }
    
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        // Fade out slightly and rentender
        optionsContainer.style.opacity = '0';
        setTimeout(() => {
            renderQuestion();
            optionsContainer.style.opacity = '1';
        }, 200);
    } else {
        showLoading();
    }
}

function showLoading() {
    switchScreen(questionScreen, loadingScreen);
    
    // Simulate API call / complex calculation
    setTimeout(() => {
        showResults();
    }, 2000);
}

function showResults() {
    // Find highest score
    let highestScore = -1;
    let resultType = 'writer'; // default
    
    for (const [key, score] of Object.entries(userScores)) {
        if (score > highestScore) {
            highestScore = score;
            resultType = key;
        }
    }
    
    const result = results[resultType];
    
    // Populate result screen
    document.getElementById('result-title').textContent = result.title;
    document.getElementById('result-description').textContent = result.description;
    
    const traitsContainer = document.getElementById('result-traits');
    traitsContainer.innerHTML = '';
    result.traits.forEach(trait => {
        const li = document.createElement('li');
        li.textContent = trait;
        traitsContainer.appendChild(li);
    });
    
    switchScreen(loadingScreen, resultScreen);
}

function resetDiagnosis() {
    switchScreen(resultScreen, startScreen);
}
