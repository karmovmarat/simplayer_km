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
    alert("initiate not implemented");
    return false;
};
Base_Chart.prototype.setFrame = function (n) {
    alert("initiate not implemented");
    return false;
};
Base_Chart.prototype.getFrame = function () {
    return this.current_frame;
};

function Progress_Chart(data, div_obj) {
    if (data.work_item_dictionary.hasOwnProperty("abc") && debug) {
        console.log("field missing.");
    }
    Base_Chart.call(this, data, div_obj);
    //custom data
    this.own_data = [];
    for (var i in data.frames) {
        var f = [];
        var frame = data.frames[i];
        for (var j in frame.work_items) {
            if (frame.work_items.hasOwnProperty(j)) {
                f.push({
                    "id": frame.work_items[j].id,
                    "type": frame.work_items[j].type,
                    "name": frame.work_items[j].name,
                    "oc": frame.work_items[j].assigned_to,
                    "children": new Object(frame.work_items[j].children),
                    "completeness": frame.work_items[j].indicators["completeness"],
                    "value": frame.work_items[j].indicators["value"]
                });
            } else {
                console.log("Progress_Chart instantiated failed, unexpected data format.");
            }
        }
        this.own_data.push(f);
    }
    if (debug) {
        console.log("Progress_Chart instantiated successfully.");
    }
}

Progress_Chart.prototype.initiate = function () {
    this.setFrame(0);
    return true;
};

Progress_Chart.prototype.setFrame = function (n) {
    if (n >= this.own_data.length) return false;
    var frame_data = this.own_data[n];
    //noinspection JSUnresolvedFunction
    this.div_obj.selectAll("div").remove();
    //noinspection JSUnresolvedFunction
    var div = this.div_obj.selectAll("div").data(frame_data);

    var diventer = div.enter().append("div").attr("id", function (d) {
        return d.id;
    }).attr("class", "progress-bar");

    var a = diventer.append("div").attr("class", "progress-bar-fg").style("width", function (d) {
        return d.completeness * 100 + "%";
    });
    a.exit().remove();
    diventer.append("span").attr("class", "progress-bar-name").text(function (d) {
        return d.name
    });

    diventer.append("span").attr("class", "progress-bar-percent").text(function (d) {
        return (d.completeness * 100).toFixed(2) + "%";
    });

    diventer.exit().remove();
    return true;
};

