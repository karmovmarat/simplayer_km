/**
 * Created by ZiyuCheng on 2/12/17.
 */

var data = des_data;

var progress_chart_div = d3.select("#progresses");

var progress_chart = new Progress_Chart(data, progress_chart_div);
progress_chart.initiate();