let app = new Vue({
    el:'#app',
    data:{
        quiz:[
            {
                topic:1,
                question:'喝咖啡、吃甜食，讓你胃食道逆流或摁摁不順暢嗎?',
                options:['還好欸，我身強體壯','有一點，最近偶爾會這樣','每天都這樣...'],
                score:['1','3','5']
            },
            {
                topic:2,
                question:'每天上課都有新東西，回家馬上又要複習，還有團專要討論，你覺得....?',
                options:['Ok的，我每天都有吃B群加睡飽吃飽，老師可以再上快點','有一點, 感覺需要費力才能在進度上','快不行了..腦袋常常打結當機'],
                score:['1','3','5']
            },
            {
                topic:1,
                question:'常窩在電腦前久坐，或趴著划手機讓你腸胃脹氣或消化不良嗎?',
                options:['還好欸 ! 我坐一段時間就起來走動, 沒有感覺過胃脹脹的','有時候會，胃脹脹的只好起身走動一下或忍一忍過去','沒有錯 ! 這完全就是我！'],
                score:['1','3','5']
            },
            {
                topic:3,
                question:'天氣冷又少運動，覺得自己血液循環變差，膚色不再紅潤嗎?',
                options:['我還是有規律的飲食跟運動，覺得沒有問題','有一點','天氣冷我都不想動，別人看到我都以為是第四組專題裡的鬼'],
                score:['1','3','5']
            },
            {
                topic:3,
                question:'我容易熬夜，因為壓力大喜歡吃鹹酥雞或炸物讓自己放鬆?',
                options:['我知道炸物跟高油飲食對身體不健康，會忌口或本來就不愛','美食當前，我偶爾喜歡這樣犒賞自己','越油我越愛，吃起來就是爽！'],
                score:['1','3','5']
            },
            {
                topic:2,
                question:'老闆或客戶每天都給我新難題，你希望有一顆更靈光的腦袋嗎?',
                options:['不用','有一點需要',' 我很需要！'],
                score:['1','3','5']
            },
        ],
        progress: 0,
        optionsValue: ['A', 'B', 'C'],
        answer: '',
        answers: new Map(),
        submitted: false,
        topic1Score: 0,
        topic2Score: 0,
        topic3Score: 0,
        url:"cusfruits.html"
    },
    methods: {
        //上一題
        prev:function(){
            if(this.progress > 0){
                this.progress--;
                this.answer = this.answers.get(this.progress);
                console.log(this.answer);
                if(this.progress == 0 || this.progress == 2){
                    switch(this.answer){
                        case 'A':
                        this.topic1Score -= 1;
                        break;
                        case 'B':
                        this.topic1Score -= 3;
                        break;
                        case 'C':
                        this.topic1Score -= 5;
                    };
                }else if(this.progress == 1 || this.progress == 5){
                    switch(this.answer){
                        case 'A':
                        this.topic2Score -= 1;
                        break;
                        case 'B':
                        this.topic2Score -= 3;
                        break;
                        case 'C':
                        this.topic2Score -= 5;
                    };
                }else{
                    switch(this.answer){
                        case 'A':
                        this.topic3Score -= 1;
                        break;
                        case 'B':
                        this.topic3Score -= 3;
                        break;
                        case 'C':
                        this.topic3Score -= 5;
                    };
                };
                console.log(this.topic1Score, this.topic2Score, this.topic3Score);
            };
        },
        //下一題
        next:function(){
            if(this.progress < this.quiz.length){
                this.answers.set(this.progress, this.answer);
                console.log(this.answers);
                if(this.progress == 0 || this.progress == 2){
                    switch(this.answer){
                        case 'A':
                        this.topic1Score += 1;
                        break;
                        case 'B':
                        this.topic1Score += 3;
                        break;
                        case 'C':
                        this.topic1Score += 5;
                    };
                }else if(this.progress == 1 || this.progress == 5){
                    switch(this.answer){
                        case 'A':
                        this.topic2Score += 1;
                        break;
                        case 'B':
                        this.topic2Score += 3;
                        break;
                        case 'C':
                        this.topic2Score += 5;
                    };
                }else{
                    switch(this.answer){
                        case 'A':
                        this.topic3Score += 1;
                        break;
                        case 'B':
                        this.topic3Score += 3;
                        break;
                        case 'C':
                        this.topic3Score += 5;
                    };
                }
                this.progress++;
                this.answer = '';
                console.log(this.topic1Score, this.topic2Score, this.topic3Score);
            };
        },
        //返回
        back:function(){
            this.progress = 0;
            this.topic1Score = this.topic2Score = this.topic3Score = 0;
        },
        refreshto:function(e){
            window.location.href = e;
        },
    },
    computed: {   
        recommend(){
            if(this.topic1Score > this.topic2Score && this.topic1Score > this.topic3Score){
                return '1';
            }else if(this.top2c1Score > this.topic1Score && this.topic3Score > this.topic1Score){
                return '2';
            }else if(this.topic3Score > this.topic1Score && this.topic3Score > this.topic1Score){
                return '3';
            }else if(this.topic1Score == this.topic2Score && this.topic1Score > this.topic3Score){
                return '4';
            }else if(this.topic1Score == this.topic3Score && this.topic1Score > this.topic2Score){
                return '5';
            }else if(this.topic2Score == this.topic3Score && this.topic2Score > this.topic1Score){
                return '6';
            }else if(this.topic1Score == this.topic2Score && this.topic1Score == this.topic3Score){
                return '7';
            }else{
                return '8';
            };
        },
    },
    mounted() {
        if(sessionStorage.recommend){
            this.recommend = sessionStorage.recommend;
        } 
    },
    watch:{
        recommend(newrRecommend) {
            sessionStorage.recommend = newrRecommend;
        },
    },
})

// -------------------------------------------------

let app2 = new Vue({
    el:'#app2',
    data:{
        quiz:[
            {
                topic:1,
                question:'喝咖啡、吃甜食，讓你胃食道逆流或摁摁不順暢嗎?',
                options:['還好欸，我身強體壯','有一點，最近偶爾會這樣','每天都這樣...'],
                score:['1','3','5']
            },
            {
                topic:2,
                question:'每天上課都有新東西，回家馬上又要複習，還有團專要討論，你覺得....?',
                options:['Ok的，我每天都有吃B群加睡飽吃飽，老師可以再上快點','有一點, 感覺需要費力才能在進度上','快不行了..腦袋常常打結當機'],
                score:['1','3','5']
            },
            {
                topic:1,
                question:'常窩在電腦前久坐，或趴著划手機讓你腸胃脹氣或消化不良嗎?',
                options:['還好欸 ! 我坐一段時間就起來走動, 沒有感覺過胃脹脹的','有時候會，胃脹脹的只好起身走動一下或忍一忍過去','沒有錯 ! 這完全就是我！'],
                score:['1','3','5']
            },
            {
                topic:3,
                question:'天氣冷又少運動，覺得自己血液循環變差，膚色不再紅潤嗎?',
                options:['我還是有規律的飲食跟運動，覺得沒有問題','有一點','天氣冷我都不想動，別人看到我都以為是第四組專題裡的鬼'],
                score:['1','3','5']
            },
            {
                topic:3,
                question:'我容易熬夜，因為壓力大喜歡吃鹹酥雞或炸物讓自己放鬆?',
                options:['我知道炸物跟高油飲食對身體不健康，會忌口或本來就不愛','美食當前，我偶爾喜歡這樣犒賞自己','越油我越愛，吃起來就是爽！'],
                score:['1','3','5']
            },
            {
                topic:2,
                question:'老闆或客戶每天都給我新難題，你希望有一顆更靈光的腦袋嗎?',
                options:['不用','有一點需要',' 我很需要！'],
                score:['1','3','5']
            },
        ],
        progress: 0,
        optionsValue: ['A', 'B', 'C'],
        answer: '',
        answers: new Map(),
        submitted: false,
        topic1Score: 0,
        topic2Score: 0,
        topic3Score: 0,
        url:"cusfruits.html"
    },
    methods: {
        //上一題
        prev:function(){
            if(this.progress > 0){
                this.progress--;
                this.answer = this.answers.get(this.progress);
                console.log(this.answer);
                if(this.progress == 0 || this.progress == 2){
                    switch(this.answer){
                        case 'A':
                        this.topic1Score -= 1;
                        break;
                        case 'B':
                        this.topic1Score -= 3;
                        break;
                        case 'C':
                        this.topic1Score -= 5;
                    };
                }else if(this.progress == 1 || this.progress == 5){
                    switch(this.answer){
                        case 'A':
                        this.topic2Score -= 1;
                        break;
                        case 'B':
                        this.topic2Score -= 3;
                        break;
                        case 'C':
                        this.topic2Score -= 5;
                    };
                }else{
                    switch(this.answer){
                        case 'A':
                        this.topic3Score -= 1;
                        break;
                        case 'B':
                        this.topic3Score -= 3;
                        break;
                        case 'C':
                        this.topic3Score -= 5;
                    };
                };
                console.log(this.topic1Score, this.topic2Score, this.topic3Score);
            };
        },
        //下一題
        next:function(){
            if(this.progress < this.quiz.length){
                this.answers.set(this.progress, this.answer);
                console.log(this.answers);
                if(this.progress == 0 || this.progress == 2){
                    switch(this.answer){
                        case 'A':
                        this.topic1Score += 1;
                        break;
                        case 'B':
                        this.topic1Score += 3;
                        break;
                        case 'C':
                        this.topic1Score += 5;
                    };
                }else if(this.progress == 1 || this.progress == 5){
                    switch(this.answer){
                        case 'A':
                        this.topic2Score += 1;
                        break;
                        case 'B':
                        this.topic2Score += 3;
                        break;
                        case 'C':
                        this.topic2Score += 5;
                    };
                }else{
                    switch(this.answer){
                        case 'A':
                        this.topic3Score += 1;
                        break;
                        case 'B':
                        this.topic3Score += 3;
                        break;
                        case 'C':
                        this.topic3Score += 5;
                    };
                }
                this.progress++;
                this.answer = '';
                console.log(this.topic1Score, this.topic2Score, this.topic3Score);
            };
        },
        //返回
        back:function(){
            this.progress = 0;
            this.topic1Score = this.topic2Score = this.topic3Score = 0;
        },
        refreshto:function(e){
            window.location.href = e;
        },
    },
    computed: {   
        recommend(){
            if(this.topic1Score > this.topic2Score && this.topic1Score > this.topic3Score){
                return '1';
            }else if(this.top2c1Score > this.topic1Score && this.topic3Score > this.topic1Score){
                return '2';
            }else if(this.topic3Score > this.topic1Score && this.topic3Score > this.topic1Score){
                return '3';
            }else if(this.topic1Score == this.topic2Score && this.topic1Score > this.topic3Score){
                return '4';
            }else if(this.topic1Score == this.topic3Score && this.topic1Score > this.topic2Score){
                return '5';
            }else if(this.topic2Score == this.topic3Score && this.topic2Score > this.topic1Score){
                return '6';
            }else if(this.topic1Score == this.topic2Score && this.topic1Score == this.topic3Score){
                return '7';
            }else{
                return '8';
            };
        },
    },
    mounted() {
        if(sessionStorage.recommend){
            this.recommend = sessionStorage.recommend;
        } 
    },
    watch:{
        recommend(newrRecommend) {
            sessionStorage.recommend = newrRecommend;
        },
    },
})
