/**
 * Created by Ziyu Cheng on 1/24/17.
 */

var OrganizationComponent = {
    create: function (id, name, desc, skills, ext_q, acp_q, wrk_q, indicators) {
        var oc = {};
        oc.name = name;
        oc.description = desc;
        oc.id = id;
        oc.skills = skills.slice(0);
        oc.external_queue = ext_q.slice(0);
        oc.accepted_queue = acp_q.slice(0);
        oc.working_queue = wrk_q.slice(0);
        oc.indicators = new Object(indicators);
        return oc;
    },
    clone: function (src) {
        var copy = {};
        copy.name = src.name;
        copy.description = src.description;
        copy.id = src.id;
        copy.skills = src.skills.concat();
        copy.accepted_queue = src.accepted_queue.concat();
        copy.working_queue = src.working_queue.concat();
        copy.indicators = new Object(src.indicators);
        return copy;
    }
};

var Work_Item = {
    create: function (id, name, type, description, size, skills, assigned_to, indicators, children) {
        var wi = {};
        wi.id = id;
        wi.name = name;
        wi.type = type;
        wi.description = description;
        wi.size = size.concat();
        wi.skills = skills.concat();
        wi.assigned_to = assigned_to;
        wi.indicators = JSON.parse(JSON.stringify(indicators));
        wi.children = children;

        return wi;
    },
    clone: function (src) {
        // var copy = {};
        // copy.id = src.id;
        // copy.name = src.name;
        // copy.type = src.type;
        // copy.description = src.description;
        // copy.size = src.size.concat();
        // copy.skills = src.skills.concat();
        // copy.assigned_to = src.assigned_to;
        // copy.indicators = new Object(src.indicators);
        // copy.children = src.children.concat();
        // return copy;
        return JSON.parse(JSON.stringify(src));
    }
};

var Work_Event = {
    create: function (src_id, dst_id, wi_id, event_type, description, indicators) {
        var evt = {};
        evt.src_oc_id = src_id;
        evt.dst_oc_id = dst_id;
        evt.work_item_id = wi_id;
        evt.type = event_type;
        evt.description = description;
        evt.indicators = JSON.parse(JSON.stringify(indicators));
        return evt;
    },
    clone: function (src) {
        // var copy = {};
        // copy.src_oc_id = src.src_oc_id;
        // copy.dst_oc_id = src.dst_oc_id;
        // copy.work_item_id = src.work_item_id;
        // copy.type = src.type;
        // copy.description = src.description;
        // copy.indicators = new Object(src.indicators);
        // return copy;
        return (JSON.parse(JSON.stringify(src)));
    }
};

var oc_a = OrganizationComponent.create(1, "Tom", "Java Software Engineer",
    [{"name": "Java", "proficiency": 1.1}, {"name": "C++", "proficiency": 1.5}], [], [], [],
    {"wip": 0, "done": 0, "work load": 0});

var oc_b = OrganizationComponent.create(2, "Mobile Team", "This is Mobile Team",
    [{"name": "C#", "proficiency": 3.0}, {"name": "C", "proficiency": 2.0}], [], [], [],
    {"wip": 0, "done": 0, "work load": 0});

var oc_c = OrganizationComponent.create(3, "Server Team", "This is Mobile Team",
    [{"name": "Java", "proficiency": 2.0}], [], [], [], {"wip": 0, "done": 0, "work load": 0});


var capability_a = Work_Item.create("101", "Capability 1", "capability", "this is capability 1", [20, 5], ["Java", "C"], "", {
    "completeness": 0.0,
    "value": 5.0
}, ["151"]);
var capability_b = Work_Item.create("102", "Capability 2", "capability", "this is capability 2", [10, 3], ["C#"], "", {
    "completeness": 0.0,
    "value": 5.0
}, ["152", "153"]);

var requirement_a = Work_Item.create("151", "requirement 1", "requirement", "this is requirement 1", [10, 3], ["C#"], "", {
    "completeness": 0.0,
    "value": 10.0
}, ["201", "202"]);
var requirement_b = Work_Item.create("152", "requirement 2", "requirement", "this is requirement 2", [5, 1], ["C#"], "", {
    "completeness": 0.0,
    "value": 10.0
}, ["202", "203"]);
var requirement_c = Work_Item.create("153", "requirement 3", "requirement", "this is requirement 3", [10, 5], ["C#"], "", {
    "completeness": 0.1,
    "value": 15.0
}, ["202", "203", "204"]);


var task_a = Work_Item.create("201", "task 1", "task", "this is task 1", [10, 3], ["Java"], "", {
    "completeness": 0.0,
    "value": 20.0
}, []);
var task_b = Work_Item.create("202", "task 2", "task", "this is task 2", [10, 3], ["JavaScript"], "", {
    "completeness": 0.0,
    "value": 20.0
}, []);
var task_c = Work_Item.create("203", "task 3", "task", "this is task 3", [10, 3], ["C#"], "", {
    "completeness": 0.0,
    "value": 20.0
}, []);
var task_d = Work_Item.create("204", "task 4", "task", "this is task 4", [10, 3], ["C#"], "", {
    "completeness": 0.0,
    "value": 10.0
}, []);


oc_a.accepted_queue.push(201);
oc_a.working_queue.push(202);
oc_b.accepted_queue.push(203);
oc_c.external_queue.push(204);

var event_a = Work_Event.create("1", "2", "201", "WI Delegation", "first event.", {});
var event_b = Work_Event.create("2", "", "201", "Work Started", "OC-2 started on WI-201", {});
var event_c = Work_Event.create("2", "1", "202", "WI Delegation", "OC-2 delegated WI-202 to OC-1", {});
var event_d = Work_Event.create("2", "", "201", "WI Completed", "OC-2 finished WI-201", {});

capability_a.indicators.completeness = 0.0;
capability_b.indicators.completeness = 0.0;
requirement_a.indicators.completeness = 0.15;
requirement_b.indicators.completeness = 0.17;
requirement_c.indicators.completeness = 0.21;
task_a.indicators.completeness = 0.1;
task_b.indicators.completeness = 0.1;
task_c.indicators.completeness = 0.1;
task_d.indicators.completeness = 0.1;

frames = [
    {
        "organization_components": {
            1: OrganizationComponent.clone(oc_a),
            2: OrganizationComponent.clone(oc_b),
            3: OrganizationComponent.clone(oc_c)
        },
        "work_items": {
            101: Work_Item.clone(capability_a),
            102: Work_Item.clone(capability_b),
            151: Work_Item.clone(requirement_a),
            152: Work_Item.clone(requirement_b),
            153: Work_Item.clone(requirement_c),
            201: Work_Item.clone(task_a),
            202: Work_Item.clone(task_b),
            203: Work_Item.clone(task_c),
            204: Work_Item.clone(task_d)
        },
        "events": [],
        "aggregating_indicators": {"wip": 0, "done": 0}
    }
];

capability_a.indicators.completeness = 0.15;
capability_b.indicators.completeness = 0.12;
requirement_a.indicators.completeness = 0.25;
requirement_b.indicators.completeness = 0.27;
requirement_c.indicators.completeness = 0.31;
task_a.indicators.completeness = 0.4;
task_b.indicators.completeness = 0.5;
task_c.indicators.completeness = 0.1;
task_d.indicators.completeness = 0.1;

frames.push({
    "organization_components": {
        1: OrganizationComponent.clone(oc_a),
        2: OrganizationComponent.clone(oc_b),
        3: OrganizationComponent.clone(oc_c)
    },
    "work_items": {
        101: Work_Item.clone(capability_a),
        102: Work_Item.clone(capability_b),
        151: Work_Item.clone(requirement_a),
        152: Work_Item.clone(requirement_b),
        153: Work_Item.clone(requirement_c),
        201: Work_Item.clone(task_a),
        202: Work_Item.clone(task_b),
        203: Work_Item.clone(task_c),
        204: Work_Item.clone(task_d)
    },
    "events": [event_a, event_b],
    "aggregating_indicators": {"wip": 1, "done": 0}
});

capability_a.indicators.completeness = 0.35;
capability_b.indicators.completeness = 0.42;
requirement_a.indicators.completeness = 0.55;
requirement_b.indicators.completeness = 0.57;
requirement_c.indicators.completeness = 0.51;
task_a.indicators.completeness = 0.6;
task_b.indicators.completeness = 0.7;
task_c.indicators.completeness = 0.5;
task_d.indicators.completeness = 0.5;

frames.push({
    "organization_components": {
        1: OrganizationComponent.clone(oc_a),
        2: OrganizationComponent.clone(oc_b),
        3: OrganizationComponent.clone(oc_c)
    },
    "work_items": {
        101: Work_Item.clone(capability_a),
        102: Work_Item.clone(capability_b),
        151: Work_Item.clone(requirement_a),
        152: Work_Item.clone(requirement_b),
        153: Work_Item.clone(requirement_c),
        201: Work_Item.clone(task_a),
        202: Work_Item.clone(task_b),
        203: Work_Item.clone(task_c),
        204: Work_Item.clone(task_d)
    },
    "events": [event_c],
    "aggregating_indicators": {"wip": 1, "done": 0}
});

capability_a.indicators.completeness = 1;
capability_b.indicators.completeness = 1;
requirement_a.indicators.completeness = 0.99;
requirement_b.indicators.completeness = 0.86;
requirement_c.indicators.completeness = 0.70;
task_a.indicators.completeness = 1;
task_b.indicators.completeness = 1;
task_c.indicators.completeness = 1;
task_d.indicators.completeness = 0.9;

frames.push({
    "organization_components": {
        1: OrganizationComponent.clone(oc_a),
        2: OrganizationComponent.clone(oc_b),
        3: OrganizationComponent.clone(oc_c)
    },
    "work_items": {
        101: Work_Item.clone(capability_a),
        102: Work_Item.clone(capability_b),
        151: Work_Item.clone(requirement_a),
        152: Work_Item.clone(requirement_b),
        153: Work_Item.clone(requirement_c),
        201: Work_Item.clone(task_a),
        202: Work_Item.clone(task_b),
        203: Work_Item.clone(task_c),
        204: Work_Item.clone(task_d)
    },
    "events": [event_d],
    "aggregating_indicators": {"wip": 0, "done": 1}
});

var basic_info = {
    "exp_name": "Test Exp Name"
};

oc_dictionary = [
    {"name": "wip", "x": "Time", "y": "#", "title": "Work Item In Progress"},
    {"name": "done", "x": "Time", "y": "#", "title": "Completed Work Items"},
    {"name": "work load", "x": "Time", "y": "Load", "title": "Work Load"}
];

work_item_dictionary = [
    {"name": "completeness", "x": "Time", "y": "%", "title": "Completeness"},
    {"name": "value", "x": "Time", "y": "Value", "title": "Value"}
];

event_dictionary = [];

frame_dictionary = [
    {"name": "wip", "x": "Time", "y": "#", "title": "Total # of Work Item in Progress"},
    {"name": "done", "x": "Time", "y": "#", "title": "Total # of Completed Work Items"}
];

data = {
    "basic_info": basic_info,
    "oc_dictionary": oc_dictionary,
    "work_item_dictionary": work_item_dictionary,
    "event_dictionary": event_dictionary,
    "frame_dictionary": frame_dictionary,
    "frames": frames
};
jstr = JSON.stringify(data);
console.log(jstr);
