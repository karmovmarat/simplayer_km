/**
 * Created by ZiyuCheng on 2/12/17.
 */

var debug = true;

/*
 *  Base Chart
 */
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
// Base_Chart.prototype.getFrame = function () {
//     return this.current_frame;
// };

/*
 *  Progress Chart
 */
function Progress_Chart(data, div_obj) {
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

    this.current_frame = n;
    return true;
};

/*
 *  DSL Chart
 */
function DSL_Chart(data, div_obj) {
    Base_Chart.call(this, data, div_obj);
    this.current_frame = 0;
    this.own_data = [];
    for (var i in data.frames) {
        var fra = [];
        var cur = data.frames[i];
        for (var j in cur.events) {
            if (cur.events.hasOwnProperty(j)) {
                fra.push({
                    "description": cur.events[j].description,
                    "type": cur.events[j].type,
                    "src_oc": cur.organization_components[cur.events[j].src_oc_id],
                    "dst_oc": cur.organization_components[cur.events[j].dst_oc_id],
                    "work_item": cur.work_items[cur.events[j].work_item_id],
                    "indicators": cur.events[j].indicators
                });
            }
        }
        this.own_data.push(fra);
    }
    if (debug) {
        console.log("DSL_Chart instantiated successfully.");
    }
}

DSL_Chart.prototype.initiate = function () {
    this.setFrame(0);
    return true;
};

DSL_Chart.prototype.setFrame = function (n) {
    if (n < 0 || n >= this.own_data.length) return false;
    var frame = this.own_data[n];
    this.div_obj.selectAll("p").remove();
    this.div_obj.selectAll("p").data(frame).enter().append("p").text(function (d) {
        return d.description + " : " + (d.src_oc ? d.src_oc.name : "") + " : " + (d.dst_oc ? d.dst_oc.name : "") + " : "
            + (d.work_item ? d.work_item.name : "");
    });
};

/*
 Aggregating Indicators Chart
 This chart works with 2 select and 1 svg section.
 */
function Aggregating_Indicators(data, div_obj, agg_select, svg_obj) {
    Base_Chart.call(this, data, div_obj);
    this.current_frame = 0;
    this.total_frames = data.frames.length;
    this.agg_select = agg_select;
    this.svg_obj = svg_obj;
    this.indicators = data.frame_dictionary;
    this.current_indicator = this.indicators["0"].name;
    this.own_data = {};
    //noinspection JSDuplicatedDeclaration
    for (var key in this.indicators) {
        if (this.indicators.hasOwnProperty(key))
            this.own_data[this.indicators[key].name] = [];
    }
    for (var i in data.frames) {
        var curFrame = data.frames[i];
        //noinspection JSDuplicatedDeclaration
        for (var key in this.indicators) {
            if (this.indicators.hasOwnProperty(key))
                this.own_data[this.indicators[key].name].push([i, curFrame.aggregating_indicators[this.indicators[key].name]]);
        }
    }
    this.width = this.svg_obj.style("width");
    this.height = this.svg_obj.style("height");
    this.margin = {top: 15, right: 10, bottom: 20, left: 25};

    this.svg_obj.append("text").text("Aggregating Indicators Chart").attr("class", "title").attr("text-anchor", 'middle')
        .attr("transform", "translate(" + (parseInt(this.width) - this.margin.right ) / 2 + "," + (this.margin.top - 6) + ")");

    if (debug) {
        console.log("Aggregating_Indicators_Chart instantiated successfully.");
    }
}

Aggregating_Indicators.prototype.initiate = function () {
    this.current_frame = 0;
    var target = this;
    for (var i in this.indicators) {
        //noinspection JSUnfilteredForInLoop
        this.agg_select.append("option").text(this.indicators[i].name).attr("value", this.indicators[i].name).property("selected", function () {
            return target.current_indicator == this.value;
        });
    }

    this.agg_select.on("change", function () {
        //noinspection JSUnresolvedVariable
        target.current_indicator = agg_select.options[agg_select.selectedIndex].value;
        target.setFrame(target.current_frame);
    });

    var width = parseInt(this.width) - this.margin.left - this.margin.right,
        height = parseInt(this.height) - this.margin.top - this.margin.bottom;

    // set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    this.valueLine = d3.line()
        .x(function (d) {
            return x(parseInt(d[0]));
        })
        .y(function (d) {
            return y(parseInt(d[1]));
        });

    this.svg_obj.append("g")
        .attr("transform",
            "translate(" + this.margin.left + "," + this.margin.top + ")");

    x.domain([0, this.total_frames - 1]);
    y.domain([0, d3.max(this.own_data[this.current_indicator], function (d) {
        return parseInt(d[1]);
    })]);

    // Add the X Axis
    this.svg_obj.append("g")
        .attr("transform", "translate(" + this.margin.left +"," + (height + this.margin.top) + ")")
        .attr("class", "x axis")
        .call(d3.axisBottom(x).ticks(this.total_frames));

    // Add the Y Axis
    this.svg_obj.append("g").attr("transform", "translate(" + this.margin.left +", " + this.margin.top + ")")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

    this.svg_obj.append("path")
        .attr("class", "line")
        .attr("transform", "translate(" + this.margin.left +"," + this.margin.top + ")")
        .attr("d", this.valueLine(this.own_data[this.current_indicator].slice(0, this.current_frame)));

    this.x = x;
    this.y = y;
    return true;
};

Aggregating_Indicators.prototype.setFrame = function (n) {
    if (n < 0 || n >= this.own_data.length) return false;
    this.y.domain([0, d3.max(this.own_data[this.current_indicator], function (d) {
        return parseInt(d[1]);
    })]);
    var newData = this.own_data[this.current_indicator].slice(0, n + 1);

    var svg = this.svg_obj.transition();

    svg.select(".y.axis").duration(750).call(d3.axisLeft(this.y));
    svg.select(".line")
        .duration(750)
        .attr("d", this.valueLine(newData));
    this.current_frame = n;
    return true;
};

/*
 Organization Components Indicators Chart
 This chart works with 2 select and 1 svg section.
 */
function OC_Indicators_Chart(data, div_obj, oc_selector, indicator_selector, svg_obj) {
    Base_Chart.call(this, data, div_obj);
    this.current_frame = 0;
    this.total_frames = data.frames.length;
    this.wi_selector = oc_selector;
    this.indicator_selector = indicator_selector;
    this.svg_obj = svg_obj;
    this.indicators = data.oc_dictionary;

    this.width = svg_obj.style("width");
    this.height = svg_obj.style("height");

    this.own_data = {};
    for (var i in data.frames) {
        var curFrame = data.frames[i];
        for (var j in curFrame.organization_components) {
            if (j in curFrame.organization_components) {
                var cur_oc = curFrame.organization_components[j];
                if (!(cur_oc.id in this.own_data)) {
                    this.own_data[cur_oc.id] = {"id": cur_oc.id, "name": cur_oc.name};
                }
                for (var idc in cur_oc.indicators) {
                    if (!(idc in this.own_data[cur_oc.id])) {
                        this.own_data[cur_oc.id][idc] = [];
                    }
                    this.own_data[cur_oc.id][idc].push(cur_oc.indicators[idc]);
                }
            }
        }
    }

    // this.current_indicator = this.indicators[0].name;
    this.current_indicator = 0;
    this.current_oc = Object.keys(this.own_data)[0];

    this.margin = {top: 15, right: 10, bottom: 20, left: 25};
    this.svg_obj.append("text").text(this.indicators[this.current_indicator].title).attr("class", "title").attr("text-anchor", 'middle')
        .attr("transform", "translate(" + (parseInt(this.width) - this.margin.right ) / 2 + "," + (this.margin.top - 6) + ")");

    if (debug) {
        console.log("OC_Indicators_Chart instantiated successfully.");
    }
}

OC_Indicators_Chart.prototype.initiate = function () {
    var target = this;
    for (var i in this.own_data) {
        this.wi_selector.append("option").text(this.own_data[i].name).attr("value", this.own_data[i].id).property("selected", function () {
            return this.value == target.current_oc;
        });
    }
    this.wi_selector.on("change", function () {
        target.current_oc = this.options[this.selectedIndex].value;
        target.setFrame(target.current_frame);
    });

    for (var i in this.indicators) {
        this.indicator_selector.append("option").text(this.indicators[i].name).attr("value", this.indicators[i].name).property("selected", function () {
            return i == target.current_indicator;
        });
    }
    this.indicator_selector.on("change", function () {
        // target.current_indicator = this.options[this.selectedIndex].value;
        target.current_indicator = this.selectedIndex;
        target.setFrame(target.current_frame);
    });

    var width = parseInt(this.width) - this.margin.left - this.margin.right,
        height = parseInt(this.height) - this.margin.top - this.margin.bottom;

    // set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    this.valueLine = d3.line()
        .x(function (d, i) {
            return x(i);
        })
        .y(function (d) {
            return y(parseInt(d));
        });

    this.svg_obj.append("g")
        .attr("transform",
            "translate(" + this.margin.left + "," + this.margin.top + ")");

    x.domain([0, this.total_frames - 1]);
    y.domain([0, d3.max(this.own_data[this.current_oc][this.indicators[this.current_indicator].name], function (d) {
        return parseInt(d);
    })]);

    // Add the X Axis
    this.svg_obj.append("g")
        .attr("transform", "translate(" + this.margin.left +"," + (height + this.margin.top) + ")")
        .attr("class", "x axis")
        .call(d3.axisBottom(x).ticks(this.total_frames));

    // Add the Y Axis
    this.svg_obj.append("g").attr("transform", "translate(" + this.margin.left +", " + this.margin.top + ")")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

    this.svg_obj.append("path")
        .attr("class", "line")
        .attr("transform", "translate(" + this.margin.left +"," + this.margin.top + ")")
        .attr("d", this.valueLine(this.own_data[this.current_oc][this.indicators[this.current_indicator].name].slice(0, this.current_frame)));

    this.x = x;
    this.y = y;

    return true;
};

OC_Indicators_Chart.prototype.setFrame = function (n) {
    if (n < 0 || n >= this.own_data[this.current_oc][this.indicators[this.current_indicator].name].length) return false;
    // var y_key = this.current_indicator;
    this.y.domain([0, d3.max(this.own_data[this.current_oc][this.indicators[this.current_indicator].name], function (d) {
        return parseInt(d);
    })]);
    var newData = this.own_data[this.current_oc][this.indicators[this.current_indicator].name].slice(0, n + 1);

    var svg = this.svg_obj.transition();
    svg.select(".title").text(this.indicators[this.current_indicator].title);
    svg.select(".y.axis").duration(750).call(d3.axisLeft(this.y));
    svg.select(".line")
        .duration(750)
        .attr("d", this.valueLine(newData));
    this.current_frame = n;
    return true;
};

/*
 Work Item Indicators Chart
 This chart works with 2 select and 1 svg section.
 */
function WI_Indicators_Chart(data, div_obj, wi_selector, indicator_selector, svg_obj) {
    Base_Chart.call(this, data, div_obj);
    this.current_frame = 0;
    this.total_frames = data.frames.length;
    this.wi_selector = wi_selector;
    this.indicator_selector = indicator_selector;
    this.svg_obj = svg_obj;
    this.indicators = data.work_item_dictionary;

    this.width = svg_obj.style("width");
    this.height = svg_obj.style("height");

    this.own_data = {};
    for (var i in data.frames) {
        var curFrame = data.frames[i];
        for (var j in curFrame.work_items) {
            if (j in curFrame.work_items) {
                var cur_wi = curFrame.work_items[j];
                if (!(cur_wi.id in this.own_data)) {
                    this.own_data[cur_wi.id] = {"id": cur_wi.id, "name": cur_wi.name};
                }
                for (var idc in cur_wi.indicators) {
                    if (!(idc in this.own_data[cur_wi.id])) {
                        this.own_data[cur_wi.id][idc] = [];
                    }
                    this.own_data[cur_wi.id][idc].push(cur_wi.indicators[idc]);
                }
            }
        }
    }

    this.current_indicator = 0;
    this.current_wi = Object.keys(this.own_data)[0];

    this.margin = {top: 15, right: 10, bottom: 20, left: 25};

    this.svg_obj.append("text").text(this.indicators[this.current_indicator].title).attr("class", "title").attr("text-anchor", 'middle')
        .attr("transform", "translate(" + (parseInt(this.width) - this.margin.right ) / 2 + "," + (this.margin.top - 6) + ")");

    if (debug) {
        console.log("WI_Indicators_Chart instantiated successfully.");
    }
}

WI_Indicators_Chart.prototype.initiate = function () {
    var target = this;
    for (var i in this.own_data) {
        this.wi_selector.append("option").text(this.own_data[i].name).attr("value", this.own_data[i].id).property("selected", function () {
            return this.value == target.current_wi;
        });
    }
    this.wi_selector.on("change", function () {
        target.current_wi = this.options[this.selectedIndex].value;
        target.setFrame(target.current_frame);
    });

    for (var i in this.indicators) {
        this.indicator_selector.append("option").text(this.indicators[i].name).attr("value", this.indicators[i].name).property("selected", function () {
            return parseInt(i) == target.current_indicator;
        });
    }
    this.indicator_selector.on("change", function () {
        target.current_indicator = this.selectedIndex;
        target.setFrame(target.current_frame);
    });

    var width = parseInt(this.width) - this.margin.left - this.margin.right,
        height = parseInt(this.height) - this.margin.top - this.margin.bottom;

    // set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    this.valueLine = d3.line()
        .x(function (d, i) {
            return x(i);
        })
        .y(function (d) {
            return y(parseInt(d));
        });

    this.svg_obj.append("g")
        .attr("transform",
            "translate(" + this.margin.left + "," + this.margin.top + ")");

    x.domain([0, this.total_frames - 1]);
    y.domain([0, d3.max(this.own_data[this.current_wi][this.indicators[this.current_indicator].name], function (d) {
        return parseInt(d);
    })]);

    // Add the X Axis
    this.svg_obj.append("g")
        .attr("transform", "translate(" + this.margin.left +"," + (height + this.margin.top) + ")")
        .attr("class", "x axis")
        .call(d3.axisBottom(x).ticks(this.total_frames));

    // Add the Y Axis
    this.svg_obj.append("g").attr("transform", "translate(" + this.margin.left +", " + this.margin.top + ")")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

    this.svg_obj.append("path")
        .attr("class", "line")
        .attr("transform", "translate(" + this.margin.left +"," + this.margin.top + ")")
        .attr("d", this.valueLine(this.own_data[this.current_wi][this.indicators[this.current_indicator].name].slice(0, this.current_frame)));

    this.x = x;
    this.y = y;

    return true;
};

WI_Indicators_Chart.prototype.setFrame = function (n) {
    if (n < 0 || n >= this.own_data[this.current_wi][this.indicators[this.current_indicator].name].length) return false;
    // var y_key = this.current_indicator;
    this.y.domain([0, d3.max(this.own_data[this.current_wi][this.indicators[this.current_indicator].name], function (d) {
        return parseInt(d);
    })]);
    var newData = this.own_data[this.current_wi][this.indicators[this.current_indicator].name].slice(0, n + 1);

    var svg = this.svg_obj.transition();
    svg.select(".title").text(this.indicators[this.current_indicator].title);
    svg.select(".y.axis").duration(750).call(d3.axisLeft(this.y));
    svg.select(".line")
        .duration(750)
        .attr("d", this.valueLine(newData));
    this.current_frame = n;
    return true;
};