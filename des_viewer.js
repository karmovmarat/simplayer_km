/**
 * Created by ZiyuCheng on 2/12/17.
 */

var debug = true;

function Base_Chart(data, div_obj) {
    this.orginal_data = data;
    this.div_obj = div_obj;
    this.current_frame = -1;
}
Base_Chart.prototype.initiate = function () {
    alert("initiate not implemented")
};
Base_Chart.prototype.setFrame = function (n) {
    alert("initiate not implemented")
};
Base_Chart.prototype.getFrame = function () {
    return this.current_frame;
};
Base_Chart.prototype.getDiv_obj = function () {
    return this.div_obj;
};

function Progress_Chart(data, div_obj) {
    if (debug && data.work_item_dictionary.hasOwnProperty("abc")) {
        console.log("field missing.")
    }
    Base_Chart.call(this, data, div_obj);
    indictors_dict = data.work_item_dictionary;
    this.own_data = [];
    for (i in data.frames) {
        var f = [];
        var frame = data.frames[i]
        for (j in frame.work_items) {
            f.push({
                "id": frame.work_items[j].id,
                "name": frame.work_items[j].name,
                "children": new Object(frame.work_items[j].children),
                "completeness": frame.work_items[j].indicators["completeness"]
            })
        }
        this.own_data.push(f);
    }
    if (debug) {
        console.log("Progress_Chart instantiated successfully.")
    }
}

Progress_Chart.prototype.initiate = function () {
    this.setFrame(0);
};

Progress_Chart.prototype.setFrame = function (n) {
    var frame_data = this.own_data[n];

    var div = this.div_obj.selectAll("div").data(frame_data);

    var diventer = div.enter().append("div").attr("id", function (d) {
        return d.id;
    }).attr("class", "progress-bar");

    diventer.append("div").attr("class", "progress-bar-fg").style("width", function (d) {
        return d.completeness * 100 + "%";
    });

    diventer.append("span").attr("class", "progress-bar-name").text(function (d) {
        return d.name
    });

    diventer.append("span").attr("class", "progress-bar-percent").text(function(d){
        return d.completeness * 100 + "%";
    });

    diventer.exit().remove();
};

