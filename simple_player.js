/**
 * Created by ZiyuCheng on 2/12/17.
 */

function Simple_Player(data, duration) {
    this.charts = [];
    this.current_frame = 0;
    this.max_frame = data.frames.length;
    this.duration = duration * 1000;
    this.play_status = "stop";
}

Simple_Player.prototype.initiate = function () {
    for (var i in this.charts) {
        if (!this.charts[i].initiate()) {
            console.log(charts[i] + " initiate failed.")
        }
    }
    return true;
};

Simple_Player.prototype.setFrame = function (n) {
    if (n < this.max_frame && n >= 0) {
        for (var i in this.charts) {
            this.charts[i].setFrame(n);
        }
        this.current_frame = n;
        return true;
    }
    console.log(n + " out of range(0 - " + this.max_frame + ")");
    return false;
};

Simple_Player.prototype.addChart = function (chart) {
    this.charts.push(chart);
};

Simple_Player.prototype.play = function () {
    if (this.play_status == "playing") {
        console.log("player is already playing.");
        return false;
    } else {
        if(this.play_status == "finished"){
            this.setFrame(0);
        }else{
            this.setFrame(this.current_frame + 1);
        }
        this.play_status = "playing";

        setTimeout(this.play_routine, this.duration, this);
        return true;
    }
};

Simple_Player.prototype.play_routine = function (player) {
    if (player.play_status == "playing") {
        if (player.current_frame < player.max_frame - 1) {
            player.setFrame(player.current_frame + 1);
            setTimeout(player.play_routine, player.duration, player);
        }else{
            player.play_status = "finished";
        }
    }
};

Simple_Player.prototype.pause = function () {
    this.play_status = "pause";
};

Simple_Player.prototype.stop = function () {
    this.setFrame(0);
    this.play_status = "stop";
};

var sim_player;

var data = d3.json("./data-example.json", function (error, data) {

    d3.select("#exp_name").text(data.basic_info.exp_name);

    this.sim_player = new Simple_Player(data, 1);

    // add charts and register below.

    // progress chart
    var progress_chart = new Progress_Chart(data, d3.select("#progresses"));
    sim_player.addChart(progress_chart);

    // DSL chart
    var dsl_chart = new DSL_Chart(data, d3.select("#dsl_content"));
    sim_player.addChart(dsl_chart);

    // initiate all charts
    sim_player.initiate();
});




