//養生指數
Chart.defaults.global.legend.display = false;
var ctx = document.getElementById('heyChart');

datas = {
  labels: ['幫助消化', '活化大腦', '保護血管'],
  // 1：幫助消化 2：活化大腦 3：保護血管

  datasets: [
    {
      backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)'
      ],
      data: [0, 0, 0],
    }
  ]
};

options = {
  scale: {
    angleLines: {
      display: true //連到三角形三點的直線
    },
    ticks: {
      beginAtZero: true,
      maxTicksLimit: 7,
      suggestedMin: 0,
      suggestedMax: 3,
    },
    gridLines: {
      display: true,
      circular: true,
    },
    pointLabels: {
      fontSize: 18,
      fontColor: ['#20B2AA', '#F4A460', '#FF6347'],
      fontFamily: 'Noto Sans TC',
    }
  }
};

var heyChart = new Chart(
  ctx,
  {
    type: 'radar',
    data: datas,
    options: options
  }
);

//----------------------------------------

window.addEventListener('load', function () { 
  new WOW().init();
});