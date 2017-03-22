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
    this.animation_duration = 0;
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
                if (frame.work_items[j].type == "capability") {
                    var cur_wi = {
                        "id": frame.work_items[j].id,
                        "type": frame.work_items[j].type,
                        "name": frame.work_items[j].name,
                        "oc": frame.work_items[j].assigned_to,
                        "children": new Object(frame.work_items[j].children),
                        "completeness": frame.work_items[j].indicators["completeness"],
                        "value": frame.work_items[j].indicators["value"]
                    };
                    f.push(cur_wi);
                    for (var r in cur_wi.children) {
                        var cur_re = {
                            "id": frame.work_items[cur_wi.children[r]].id,
                            "type": frame.work_items[cur_wi.children[r]].type,
                            "name": frame.work_items[cur_wi.children[r]].name,
                            "oc": frame.work_items[cur_wi.children[r]].assigned_to,
                            "children": new Object(frame.work_items[cur_wi.children[r]].children),
                            "completeness": frame.work_items[cur_wi.children[r]].indicators["completeness"],
                            "value": frame.work_items[cur_wi.children[r]].indicators["value"]
                        };
                        f.push(cur_re);
                        for (var t in cur_re.children) {
                            var cur_ta = {
                                "id": frame.work_items[cur_re.children[t]].id,
                                "type": frame.work_items[cur_re.children[t]].type,
                                "name": frame.work_items[cur_re.children[t]].name,
                                "oc": frame.work_items[cur_re.children[t]].assigned_to,
                                "children": new Object(frame.work_items[cur_re.children[t]].children),
                                "completeness": frame.work_items[cur_re.children[t]].indicators["completeness"],
                                "value": frame.work_items[cur_re.children[t]].indicators["value"]
                            };
                            f.push(cur_ta);
                        }
                    }
                }
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
    }).attr("class", function (d) {
        if (d.type == "capability") return "progress capability";
        else if (d.type == "requirement") return "progress requirement";
        else if (d.type == "task") return "progress task";
        else {
            console.log("unexpected work item type.");
        }
    });

    var a = diventer.append("div").attr("class", "progress-bar progress-bar-info progress-bar-striped active").style("width", function (d) {
        return d.completeness * 100 + "%";
    }).attr("roll", "progressbar").attr("aria-valuenow", "45").attr("aria-valuemin", "0").attr("aria-valuemax", "100");
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
 *  OCA Chart
 */
function OCA_Chart(data, div_obj) {
    Base_Chart.call(this, data, div_obj);
    this.current_frame = 0;
    this.oc_list = [];
    this.oc_dict = {};
    this.records = [];
    // assuming each frame has complete organization components information
    for (var i in data.frames[0].organization_components) {
        var cur_oc = data.frames[0].organization_components[i];
        this.oc_list.push({
            "name": cur_oc.name,
            "id": cur_oc.id,
            "description": cur_oc.description,
            "index": i
        })
        this.oc_dict[cur_oc.id] = this.oc_list[i];
    }

    for (var i in data.frames) {
        var cur_frame = data.frames[i];
        var fra = [];
        for (var j in cur_frame.events) {
            var cur_eve = cur_frame.events[j];
            fra.push({
                "from": cur_eve.src_oc_id,
                "to": cur_eve.dst_oc_id,
                "type": cur_eve.type
            });
        }
        this.records.push(fra);
    }
    if (debug) {
        console.log("OCA_Chart instantiated successfully.");
    }
}

OCA_Chart.prototype.initiate = function () {
    //Returns an event handler for fading a given chord group.
    this.fade = function (opacity) {
        return function (d, i) {
            svg.selectAll("path.chord")
                .filter(function (d) {
                    return d.source.index != i && d.target.index != i;
                })
                .transition()
                .style("opacity", opacity);
        };
    }//fade
    this.margin = {top: 30, right: 30, bottom: 10, left: 10};
    this.width = parseInt(this.div_obj.style("width"));
    this.height = parseInt(this.div_obj.style("height"));
    this.svg_obj = this.div_obj.append("g").attr("transform", "translate(" + (this.width / 2 + this.margin.left) + ", " + (this.height / 2 + this.margin.top) + ")");

    var names = this.oc_list.map(function (d) {
            return d.name;
        }),
        colors = ["#301E1E", "#083E77", "#342350", "#567235", "#8B161C", "#DF7C00"],
        opacityDefault = 0.8;


    var matrix = [
        [0, 1, 1],
        [1, 0, 1],
        [1, 1, 0]
    ];

    var outerRadius = Math.min(parseInt(this.width), parseInt(this.height)) / 2 - 30,
        innerRadius = outerRadius - 30;

    var chord = d3.chord().padAngle(0.05).sortSubgroups(d3.descending);

    var ribbon = d3.ribbon().radius(innerRadius);
    var color = d3.scaleOrdinal().domain(d3.range(3)).range(["#301E1E", "#083E77", "#342350"]);
    var arc = d3.arc()
        .innerRadius(innerRadius * 1.01)
        .outerRadius(outerRadius);

    var g = this.svg_obj.append("g").datum(chord(matrix));

    var group = g.append("g")
        .attr("class", "groups")
        .selectAll("g")
        .data(function (chords) {
            return chords.groups;
        })
        .enter().append("g");

    group.append("path")
        .style("fill", function (d) {
            return color(d.index);
        })
        .style("stroke", function (d) {
            return d3.rgb(color(d.index)).darker();
        })
        .attr("d", arc);

    group.append("text").each(function (d) {
        d.angle = (d.startAngle + d.endAngle) / 2;
    })
        .attr("dy", "0.35em")
        .attr("class", "titles")
        .attr("text-anchor", function (d) {
            return d.angle > Math.PI ? "end" : null;
        })
        .attr("transform", function (d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                + "translate(" + (outerRadius + 10) + ")"
                + (d.angle > Math.PI ? "rotate(180)" : "");
        })
        .text(function (d, i) {
            return names[i]
        });


    g.append("g")
        .attr("class", "ribbons")
        .selectAll("path")
        .data(function (chords) {
            return chords;
        })
        .enter().append("path")
        .attr("d", ribbon)
        .style("fill", function (d) {
            return color(d.target.index);
        })
        .style("stroke", function (d) {
            return d3.rgb(color(d.target.index)).darker();
        });

    /*
     this.translate = {x: this.margin.left, y: this.margin.top};
     deltX = this.width / this.oc_list.length;
     deltY = this.height / this.oc_list.length;
     for (var i in this.oc_list) {
     this.oc_list[i].x = i * deltX;
     this.oc_list[i].y = i * deltY;
     }

     var width = parseInt(this.width) - this.margin.left - this.margin.right,
     height = parseInt(this.height) - this.margin.top - this.margin.bottom;

     // set the ranges
     var x = d3.scalePoint().range([0, width]).domain(names);
     var y = d3.scalePoint().range([height, 0]).domain(names);

     // Add the X Axis
     this.div_obj.append("g")
     .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
     .attr("class", "x axis")
     .call(d3.axisTop(x));

     // Add the Y Axis
     this.div_obj.append("g").attr("transform", "translate(" + (this.margin.left + width) + ", " + this.margin.top + ")")
     .attr("class", "y axis")
     .call(d3.axisRight(y));
     */


    this.setFrame(0);
    return true;
};

OCA_Chart.prototype.setFrame = function (n) {


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
            return x(d[0]);
        }).y(function (d) {
            return y(d[1]);
        });

    this.valueArea = d3.area()
        .x(function (d) {
            return x(d[0]);
        }).y0(height)
        .y1(function (d) {
            return y(d[1]);
        });

    this.svg_obj.append("g")
        .attr("transform",
            "translate(" + this.margin.left + "," + this.margin.top + ")");

    x.domain([0, this.total_frames - 1]);
    y.domain([0, d3.max(this.own_data[this.current_indicator], function (d) {
        return d[1];
    })]);

    // Add the X Axis
    this.svg_obj.append("g")
        .attr("transform", "translate(" + this.margin.left + "," + (height + this.margin.top) + ")")
        .attr("class", "x axis")
        .call(d3.axisBottom(x).ticks(this.total_frames));

    // Add the Y Axis
    this.svg_obj.append("g").attr("transform", "translate(" + this.margin.left + ", " + this.margin.top + ")")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

    // Add path
    this.svg_obj.append("path")
        .attr("class", "line")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
        .attr("d", this.valueLine(this.own_data[this.current_indicator].slice(0, this.current_frame + 1)));

    this.svg_obj.append("path")
        .attr("class", "area")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
        .attr("d", this.valueArea(this.own_data[this.current_indicator].slice(0, this.current_frame + 1)));

    this.svg_obj.selectAll("circle").data(this.own_data[this.current_indicator].slice(0, this.current_frame + 1))
        .enter().append("circle").attr("r", "2.5").attr("cx", function (d) {
        return x(d[0]);
    }).attr("cy", function (d) {
        return y(d[1]);
    }).attr("transform", "translate(" + this.margin.left + ", " + this.margin.top + ")").attr("class", "point");


    this.x = x;
    this.y = y;
    return true;
};

Aggregating_Indicators.prototype.setFrame = function (n) {
    if (n < 0 || n >= this.own_data.length) return false;
    this.y.domain([0, d3.max(this.own_data[this.current_indicator], function (d) {
        return d[1];
    })]);
    var newData = this.own_data[this.current_indicator].slice(0, n + 1);

    var svg = this.svg_obj.transition();

    svg.select(".y.axis").duration(this.animation_duration).call(d3.axisLeft(this.y));
    svg.select(".line")
        .duration(this.animation_duration)
        .attr("d", this.valueLine(newData));

    svg.select(".area")
        .duration(this.animation_duration)
        .attr("d", this.valueArea(newData));

    var x = this.x;
    var y = this.y;
    this.svg_obj.selectAll("circle").remove();
    this.svg_obj.selectAll("circle").data(newData).enter().append("circle").attr("r", "2.5")
        .attr("cx", function (d) {
            return x(d[0]);
        })
        .attr("cy", function (d) {
            return y(d[1]);
        }).attr("transform", "translate(" + this.margin.left + ", " + this.margin.top + ")")
        .attr("class", "point");


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
            return y(d);
        });

    this.valueArea = d3.area()
        .x(function (d, i) {
            return x(i);
        })
        .y0(height)
        .y1(function (d) {
            return y(d);
        });

    x.domain([0, this.total_frames - 1]);
    y.domain([0, d3.max(this.own_data[this.current_oc][this.indicators[this.current_indicator].name], function (d) {
        return d;
    })]);

    // Add the X Axis
    this.svg_obj.append("g")
        .attr("transform", "translate(" + this.margin.left + "," + (height + this.margin.top) + ")")
        .attr("class", "x axis")
        .call(d3.axisBottom(x).ticks(this.total_frames));

    // Add the Y Axis
    this.svg_obj.append("g").attr("transform", "translate(" + this.margin.left + ", " + this.margin.top + ")")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

    this.svg_obj.append("path")
        .attr("class", "line")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
        .attr("d", this.valueLine(this.own_data[this.current_oc][this.indicators[this.current_indicator].name].slice(0, this.current_frame + 1)));

    this.svg_obj.append("path")
        .attr("class", "area")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
        .attr("d", this.valueArea(this.own_data[this.current_oc][this.indicators[this.current_indicator].name].slice(0, this.current_frame + 1)));

    this.svg_obj.selectAll(".point")
        .data(this.own_data[this.current_oc][this.indicators[this.current_indicator].name].slice(0, this.current_frame + 1), function (d) {
            return d;
        })
        .enter().append("circle").attr("class", "point")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
        .attr("r", "2.5")
        .attr("cx", function (d, i) {
            return x(i);
        }).attr("cy", function (d) {
        return y(d);
    }).attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")").attr("class", "point");

    this.x = x;
    this.y = y;

    return true;
};

OC_Indicators_Chart.prototype.setFrame = function (n) {
    if (n < 0 || n >= this.own_data[this.current_oc][this.indicators[this.current_indicator].name].length) return false;
    // var y_key = this.current_indicator;
    this.y.domain([0, d3.max(this.own_data[this.current_oc][this.indicators[this.current_indicator].name], function (d) {
        return d;
    })]);
    var newData = this.own_data[this.current_oc][this.indicators[this.current_indicator].name].slice(0, n + 1);

    var svg = this.svg_obj.transition();
    // update title, y_axis, line and area
    svg.select(".title").text(this.indicators[this.current_indicator].title);
    svg.select(".y.axis").duration(this.animation_duration).call(d3.axisLeft(this.y));
    svg.select(".line").duration(this.animation_duration).attr("d", this.valueLine(newData));
    svg.select(".area").duration(this.animation_duration).attr("d", this.valueArea(newData));

    var x = this.x;
    var y = this.y;
    this.svg_obj.selectAll("circle").remove();
    this.svg_obj.selectAll("circle").data(newData).enter().append("circle").attr("r", "2.5").attr("cx", function (d, i) {
        return x(i);
    }).attr("cy", function (d) {
        return y(d);
    }).attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")").attr("class", "point");

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
            return y(d);
        });

    this.valueArea = d3.area()
        .x(function (d, i) {
            return x(i);
        })
        .y0(height)
        .y1(function (d) {
            return y(d);
        });

    x.domain([0, this.total_frames - 1]);
    y.domain([0, d3.max(this.own_data[this.current_wi][this.indicators[this.current_indicator].name], function (d) {
        return d;
    })]);

    // Add the X Axis
    this.svg_obj.append("g")
        .attr("transform", "translate(" + this.margin.left + "," + (height + this.margin.top) + ")")
        .attr("class", "x axis")
        .call(d3.axisBottom(x).ticks(this.total_frames));

    // Add the Y Axis
    this.svg_obj.append("g").attr("transform", "translate(" + this.margin.left + ", " + this.margin.top + ")")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

    this.svg_obj.append("path")
        .attr("class", "line")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
        .attr("d", this.valueLine(this.own_data[this.current_wi][this.indicators[this.current_indicator].name].slice(0, this.current_frame + 1)));

    this.svg_obj.append("path")
        .attr("class", "area")
        .attr("transform", "translate (" + this.margin.left + "," + this.margin.top + ")")
        .attr("d", this.valueArea(this.own_data[this.current_wi][this.indicators[this.current_indicator].name].slice(0, this.current_frame + 1)));

    this.svg_obj.selectAll(".point")
        .data(this.own_data[this.current_wi][this.indicators[this.current_indicator].name].slice(0, this.current_frame + 1), function (d) {
            return d;
        })
        .enter().append("circle").attr("class", "point")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
        .attr("r", "2.5")
        .attr("cx", function (d, i) {
            return x(i);
        }).attr("cy", function (d) {
        return y(d);
    }).attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")").attr("class", "point");

    this.x = x;
    this.y = y;

    return true;
};

WI_Indicators_Chart.prototype.setFrame = function (n) {
    if (n < 0 || n >= this.own_data[this.current_wi][this.indicators[this.current_indicator].name].length) return false;
    var target = this;
    this.y.domain([0, d3.max(this.own_data[this.current_wi][this.indicators[this.current_indicator].name], function (d) {
        return d;
    })]);
    var newData = this.own_data[this.current_wi][this.indicators[this.current_indicator].name].slice(0, n + 1);

    var svg = this.svg_obj.transition();
    svg.select(".title").text(this.indicators[this.current_indicator].title);
    svg.select(".y.axis").duration(this.animation_duration).call(d3.axisLeft(this.y));
    svg.select(".line")
        .duration(this.animation_duration)
        .attr("d", this.valueLine(newData));
    svg.select(".area")
        .duration(this.animation_duration)
        .attr("d", this.valueArea(newData));

    var x = this.x;
    var y = this.y;

    var circles = this.svg_obj.selectAll("circle").data(newData);
    // this.svg_obj.selectAll("circle").remove();
    circles.exit().remove();
    circles.enter().append("circle").merge(circles).attr("r", "2.5")
        .attr("cx", function (d, i) {
            return x(i);
        }).attr("cy", function (d) {
        return y(d);
    }).attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")").attr("class", "point");

    // this.svg_obj.selectAll("circle").data(newData).enter().append("circle").attr("class", "point")
    //     .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
    //     .attr("r", "3.5")
    //     .attr("cx", function (d, i) {
    //         return x(i);
    //     }).attr("cy", function (d) {
    //     return y(d);
    // }).attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.current_frame = n;
    return true;
};