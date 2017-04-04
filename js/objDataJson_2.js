var objDataJson_2 = { 
  "basic_info": {
    "exp_name": "2 Test Exp Name"
  },
  "oc_dictionary": [
    {
      "name": "wip",
      "x": "Time",
      "y": "#",
      "title": "Work Item In Progress"
    },
    {
      "name": "done",
      "x": "Time",
      "y": "#",
      "title": "Completed Work Items"
    },
    {
      "name": "work load",
      "x": "Time",
      "y": "Load",
      "title": "Work Load"
    }
  ],
  "work_item_dictionary": [
    {
      "name": "completeness",
      "x": "Time",
      "y": "%",
      "title": "Completeness"
    },
    {
      "name": "value",
      "x": "Time",
      "y": "Value",
      "title": "Value"
    }
  ],
  "event_dictionary": [],
  "frame_dictionary": [
    {
      "name": "wip",
      "x": "Time",
      "y": "#",
      "title": "Total # of Work Item in Progress"
    },
    {
      "name": "done",
      "x": "Time",
      "y": "#",
      "title": "Total # of Completed Work Items"
    }
  ],
  "frames": [
    {
      "organization_components": {
        "1": {
          "name": "Tom",
          "description": "Java Software Engineer",
          "id": 1,
          "skills": [
            {
              "name": "Java",
              "proficiency": 1.1
            },
            {
              "name": "C++",
              "proficiency": 1.5
            }
          ],
          "external_queue": [],
          "accepted_queue": [
            201
          ],
          "working_queue": [
            202
          ],
          "indicators": {
            "wip": 4,
            "done": 0,
            "work load": 4
          }
        },
        "2": {
          "name": "Mobile Team",
          "description": "This is Mobile Team",
          "id": 2,
          "skills": [
            {
              "name": "C#",
              "proficiency": 3
            },
            {
              "name": "C",
              "proficiency": 2
            }
          ],
          "external_queue": [],
          "accepted_queue": [
            203
          ],
          "working_queue": [],
          "indicators": {
            "wip": 3,
            "done": 0,
            "work load": 3
          }
        },
        "3": {
          "name": "Server Team",
          "description": "This is Mobile Team",
          "id": 3,
          "skills": [
            {
              "name": "Java",
              "proficiency": 2
            }
          ],
          "external_queue": [
            204
          ],
          "accepted_queue": [],
          "working_queue": [],
          "indicators": {
            "wip": 2,
            "done": 0,
            "work load": 2
          }
        }
      },
      "work_items": {
        "101": {
          "id": "101",
          "name": "Capability 1",
          "type": "capability",
          "description": "this is capability 1",
          "size": [
            20,
            5
          ],
          "skills": [
            "Java",
            "C"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0,
            "value": 5
          },
          "children": [
            "151"
          ]
        },
        "102": {
          "id": "102",
          "name": "Capability 2",
          "type": "capability",
          "description": "this is capability 2",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0,
            "value": 5
          },
          "children": [
            "152",
            "153"
          ]
        },
        "151": {
          "id": "151",
          "name": "requirement 1",
          "type": "requirement",
          "description": "this is requirement 1",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0,
            "value": 10
          },
          "children": [
            "201",
            "202"
          ]
        },
        "152": {
          "id": "152",
          "name": "requirement 2",
          "type": "requirement",
          "description": "this is requirement 2",
          "size": [
            5,
            1
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0,
            "value": 10
          },
          "children": [
            "202",
            "203"
          ]
        },
        "153": {
          "id": "153",
          "name": "requirement 3",
          "type": "requirement",
          "description": "this is requirement 3",
          "size": [
            10,
            5
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0,
            "value": 15
          },
          "children": [
            "202",
            "203",
            "204"
          ]
        },
        "201": {
          "id": "201",
          "name": "task 1",
          "type": "task",
          "description": "this is task 1",
          "size": [
            10,
            3
          ],
          "skills": [
            "Java"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0,
            "value": 20
          },
          "children": []
        },
        "202": {
          "id": "202",
          "name": "task 2",
          "type": "task",
          "description": "this is task 2",
          "size": [
            10,
            3
          ],
          "skills": [
            "JavaScript"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0,
            "value": 20
          },
          "children": []
        },
        "203": {
          "id": "203",
          "name": "task 3",
          "type": "task",
          "description": "this is task 3",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0,
            "value": 20
          },
          "children": []
        },
        "204": {
          "id": "204",
          "name": "task 4",
          "type": "task",
          "description": "this is task 4",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0,
            "value": 10
          },
          "children": []
        }
      },
      "events": [
        {
          "src_oc_id": "1",
          "dst_oc_id": "2",
          "work_item_id": "201",
          "type": "WI Delegation",
          "description": "first event.",
          "indicators": {}
        },
        {
          "src_oc_id": "1",
          "dst_oc_id": "2",
          "work_item_id": "201",
          "type": "WI Delegation",
          "description": "first event.",
          "indicators": {}
        },
        {
          "src_oc_id": "1",
          "dst_oc_id": "2",
          "work_item_id": "201",
          "type": "WI Delegation",
          "description": "first event.",
          "indicators": {}
        },
        {
          "src_oc_id": "1",
          "dst_oc_id": "2",
          "work_item_id": "201",
          "type": "WI Delegation",
          "description": "first event.",
          "indicators": {}
        },
        {
          "src_oc_id": "1",
          "dst_oc_id": "2",
          "work_item_id": "201",
          "type": "WI Delegation",
          "description": "first event.",
          "indicators": {}
        },
        {
          "src_oc_id": "1",
          "dst_oc_id": "2",
          "work_item_id": "201",
          "type": "WI Delegation",
          "description": "first event.",
          "indicators": {}
        },
        {
          "src_oc_id": "1",
          "dst_oc_id": "2",
          "work_item_id": "201",
          "type": "WI Delegation",
          "description": "first event.",
          "indicators": {}
        },
        {
          "src_oc_id": "1",
          "dst_oc_id": "2",
          "work_item_id": "201",
          "type": "WI Delegation",
          "description": "first event.",
          "indicators": {}
        },
        {
          "src_oc_id": "1",
          "dst_oc_id": "2",
          "work_item_id": "201",
          "type": "WI Delegation",
          "description": "first event.",
          "indicators": {}
        },
        {
          "src_oc_id": "1",
          "dst_oc_id": "2",
          "work_item_id": "201",
          "type": "WI Delegation",
          "description": "first event.",
          "indicators": {}
        },
        {
          "src_oc_id": "1",
          "dst_oc_id": "2",
          "work_item_id": "201",
          "type": "WI Delegation",
          "description": "first event.",
          "indicators": {}
        },
        {
          "src_oc_id": "1",
          "dst_oc_id": "2",
          "work_item_id": "201",
          "type": "WI Delegation",
          "description": "first event.",
          "indicators": {}
        },
        {
          "src_oc_id": "1",
          "dst_oc_id": "2",
          "work_item_id": "201",
          "type": "WI Delegation",
          "description": "first event.",
          "indicators": {}
        },
        {
          "src_oc_id": "1",
          "dst_oc_id": "2",
          "work_item_id": "201",
          "type": "WI Delegation",
          "description": "first event.",
          "indicators": {}
        },
        {
          "src_oc_id": "1",
          "dst_oc_id": "2",
          "work_item_id": "201",
          "type": "WI Delegation",
          "description": "first event.",
          "indicators": {}
        },
        {
          "src_oc_id": "1",
          "dst_oc_id": "2",
          "work_item_id": "201",
          "type": "WI Delegation",
          "description": "first event.",
          "indicators": {}
        }
      ],
      "aggregating_indicators": {
        "wip": 10,
        "done": 2
      }
    },
    {
      "organization_components": {
        "1": {
          "name": "Tom",
          "description": "Java Software Engineer",
          "id": 1,
          "skills": [
            {
              "name": "Java",
              "proficiency": 1.1
            },
            {
              "name": "C++",
              "proficiency": 1.5
            }
          ],
          "external_queue": [],
          "accepted_queue": [
            201
          ],
          "working_queue": [
            202
          ],
          "indicators": {
            "wip": 2,
            "done": 4,
            "work load": 2
          }
        },
        "2": {
          "name": "Mobile Team",
          "description": "This is Mobile Team",
          "id": 2,
          "skills": [
            {
              "name": "C#",
              "proficiency": 3
            },
            {
              "name": "C",
              "proficiency": 2
            }
          ],
          "external_queue": [],
          "accepted_queue": [
            203
          ],
          "working_queue": [],
          "indicators": {
            "wip": 2,
            "done": 3,
            "work load": 2
          }
        },
        "3": {
          "name": "Server Team",
          "description": "This is Mobile Team",
          "id": 3,
          "skills": [
            {
              "name": "Java",
              "proficiency": 2
            }
          ],
          "external_queue": [
            204
          ],
          "accepted_queue": [],
          "working_queue": [],
          "indicators": {
            "wip": 2,
            "done": 2,
            "work load": 2
          }
        }
      },
      "work_items": {
        "101": {
          "id": "101",
          "name": "Capability 1",
          "type": "capability",
          "description": "this is capability 1",
          "size": [
            20,
            5
          ],
          "skills": [
            "Java",
            "C"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.15,
            "value": 5
          },
          "children": [
            "151"
          ]
        },
        "102": {
          "id": "102",
          "name": "Capability 2",
          "type": "capability",
          "description": "this is capability 2",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.12,
            "value": 5
          },
          "children": [
            "152",
            "153"
          ]
        },
        "151": {
          "id": "151",
          "name": "requirement 1",
          "type": "requirement",
          "description": "this is requirement 1",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.25,
            "value": 10
          },
          "children": [
            "201",
            "202"
          ]
        },
        "152": {
          "id": "152",
          "name": "requirement 2",
          "type": "requirement",
          "description": "this is requirement 2",
          "size": [
            5,
            1
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.2,
            "value": 10
          },
          "children": [
            "202",
            "203"
          ]
        },
        "153": {
          "id": "153",
          "name": "requirement 3",
          "type": "requirement",
          "description": "this is requirement 3",
          "size": [
            10,
            5
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.15,
            "value": 15
          },
          "children": [
            "202",
            "203",
            "204"
          ]
        },
        "201": {
          "id": "201",
          "name": "task 1",
          "type": "task",
          "description": "this is task 1",
          "size": [
            10,
            3
          ],
          "skills": [
            "Java"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.4,
            "value": 20
          },
          "children": []
        },
        "202": {
          "id": "202",
          "name": "task 2",
          "type": "task",
          "description": "this is task 2",
          "size": [
            10,
            3
          ],
          "skills": [
            "JavaScript"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.5,
            "value": 20
          },
          "children": []
        },
        "203": {
          "id": "203",
          "name": "task 3",
          "type": "task",
          "description": "this is task 3",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.2,
            "value": 20
          },
          "children": []
        },
        "204": {
          "id": "204",
          "name": "task 4",
          "type": "task",
          "description": "this is task 4",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.2,
            "value": 10
          },
          "children": []
        }
      },
      "events": [
        {
          "src_oc_id": "1",
          "dst_oc_id": "2",
          "work_item_id": "201",
          "type": "WI Delegation",
          "description": "first event.",
          "indicators": {}
        },
        {
          "src_oc_id": "2",
          "dst_oc_id": "",
          "work_item_id": "201",
          "type": "Work Started",
          "description": "OC-2 started on WI-201",
          "indicators": {}
        }
      ],
      "aggregating_indicators": {
        "wip": 8,
        "done": 4
      }
    },
    {
      "organization_components": {
        "1": {
          "name": "Tom",
          "description": "Java Software Engineer",
          "id": 1,
          "skills": [
            {
              "name": "Java",
              "proficiency": 1.1
            },
            {
              "name": "C++",
              "proficiency": 1.5
            }
          ],
          "external_queue": [],
          "accepted_queue": [
            201
          ],
          "working_queue": [
            202
          ],
          "indicators": {
            "wip": 7,
            "done": 6,
            "work load": 10
          }
        },
        "2": {
          "name": "Mobile Team",
          "description": "This is Mobile Team",
          "id": 2,
          "skills": [
            {
              "name": "C#",
              "proficiency": 3
            },
            {
              "name": "C",
              "proficiency": 2
            }
          ],
          "external_queue": [],
          "accepted_queue": [
            203
          ],
          "working_queue": [],
          "indicators": {
            "wip": 5,
            "done": 5,
            "work load": 22
          }
        },
        "3": {
          "name": "Server Team",
          "description": "This is Mobile Team",
          "id": 3,
          "skills": [
            {
              "name": "Java",
              "proficiency": 2
            }
          ],
          "external_queue": [
            204
          ],
          "accepted_queue": [],
          "working_queue": [],
          "indicators": {
            "wip": 1,
            "done": 4,
            "work load": 1
          }
        }
      },
      "work_items": {
        "101": {
          "id": "101",
          "name": "Capability 1",
          "type": "capability",
          "description": "this is capability 1",
          "size": [
            20,
            5
          ],
          "skills": [
            "Java",
            "C"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.25,
            "value": 5
          },
          "children": [
            "151"
          ]
        },
        "102": {
          "id": "102",
          "name": "Capability 2",
          "type": "capability",
          "description": "this is capability 2",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.32,
            "value": 5
          },
          "children": [
            "152",
            "153"
          ]
        },
        "151": {
          "id": "151",
          "name": "requirement 1",
          "type": "requirement",
          "description": "this is requirement 1",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.45,
            "value": 10
          },
          "children": [
            "201",
            "202"
          ]
        },
        "152": {
          "id": "152",
          "name": "requirement 2",
          "type": "requirement",
          "description": "this is requirement 2",
          "size": [
            5,
            1
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.3,
            "value": 10
          },
          "children": [
            "202",
            "203"
          ]
        },
        "153": {
          "id": "153",
          "name": "requirement 3",
          "type": "requirement",
          "description": "this is requirement 3",
          "size": [
            10,
            5
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.2,
            "value": 15
          },
          "children": [
            "202",
            "203",
            "204"
          ]
        },
        "201": {
          "id": "201",
          "name": "task 1",
          "type": "task",
          "description": "this is task 1",
          "size": [
            10,
            3
          ],
          "skills": [
            "Java"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.5,
            "value": 20
          },
          "children": []
        },
        "202": {
          "id": "202",
          "name": "task 2",
          "type": "task",
          "description": "this is task 2",
          "size": [
            10,
            3
          ],
          "skills": [
            "JavaScript"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.65,
            "value": 20
          },
          "children": []
        },
        "203": {
          "id": "203",
          "name": "task 3",
          "type": "task",
          "description": "this is task 3",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.25,
            "value": 20
          },
          "children": []
        },
        "204": {
          "id": "204",
          "name": "task 4",
          "type": "task",
          "description": "this is task 4",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.3,
            "value": 10
          },
          "children": []
        }
      },
      "events": [
        {
          "src_oc_id": "2",
          "dst_oc_id": "1",
          "work_item_id": "202",
          "type": "WI Delegation",
          "description": "OC-2 delegated WI-202 to OC-1",
          "indicators": {}
        }
      ],
      "aggregating_indicators": {
        "wip": 4,
        "done": 4
      }
    },
    {
      "organization_components": {
        "1": {
          "name": "Tom",
          "description": "Java Software Engineer",
          "id": 1,
          "skills": [
            {
              "name": "Java",
              "proficiency": 1.1
            },
            {
              "name": "C++",
              "proficiency": 1.5
            }
          ],
          "external_queue": [],
          "accepted_queue": [
            201
          ],
          "working_queue": [
            202
          ],
          "indicators": {
            "wip": 4,
            "done": 9,
            "work load": 5
          }
        },
        "2": {
          "name": "Mobile Team",
          "description": "This is Mobile Team",
          "id": 2,
          "skills": [
            {
              "name": "C#",
              "proficiency": 3
            },
            {
              "name": "C",
              "proficiency": 2
            }
          ],
          "external_queue": [],
          "accepted_queue": [
            203
          ],
          "working_queue": [],
          "indicators": {
            "wip": 1,
            "done": 10,
            "work load": 2
          }
        },
        "3": {
          "name": "Server Team",
          "description": "This is Mobile Team",
          "id": 3,
          "skills": [
            {
              "name": "Java",
              "proficiency": 2
            }
          ],
          "external_queue": [
            204
          ],
          "accepted_queue": [],
          "working_queue": [],
          "indicators": {
            "wip": 2,
            "done": 5,
            "work load": 3
          }
        }
      },
      "work_items": {
        "101": {
          "id": "101",
          "name": "Capability 1",
          "type": "capability",
          "description": "this is capability 1",
          "size": [
            20,
            5
          ],
          "skills": [
            "Java",
            "C"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.3,
            "value": 5
          },
          "children": [
            "151"
          ]
        },
        "102": {
          "id": "102",
          "name": "Capability 2",
          "type": "capability",
          "description": "this is capability 2",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.45,
            "value": 5
          },
          "children": [
            "152",
            "153"
          ]
        },
        "151": {
          "id": "151",
          "name": "requirement 1",
          "type": "requirement",
          "description": "this is requirement 1",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.65,
            "value": 10
          },
          "children": [
            "201",
            "202"
          ]
        },
        "152": {
          "id": "152",
          "name": "requirement 2",
          "type": "requirement",
          "description": "this is requirement 2",
          "size": [
            5,
            1
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.5,
            "value": 10
          },
          "children": [
            "202",
            "203"
          ]
        },
        "153": {
          "id": "153",
          "name": "requirement 3",
          "type": "requirement",
          "description": "this is requirement 3",
          "size": [
            10,
            5
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.4,
            "value": 15
          },
          "children": [
            "202",
            "203",
            "204"
          ]
        },
        "201": {
          "id": "201",
          "name": "task 1",
          "type": "task",
          "description": "this is task 1",
          "size": [
            10,
            3
          ],
          "skills": [
            "Java"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.6,
            "value": 20
          },
          "children": []
        },
        "202": {
          "id": "202",
          "name": "task 2",
          "type": "task",
          "description": "this is task 2",
          "size": [
            10,
            3
          ],
          "skills": [
            "JavaScript"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.65,
            "value": 20
          },
          "children": []
        },
        "203": {
          "id": "203",
          "name": "task 3",
          "type": "task",
          "description": "this is task 3",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.35,
            "value": 20
          },
          "children": []
        },
        "204": {
          "id": "204",
          "name": "task 4",
          "type": "task",
          "description": "this is task 4",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.35,
            "value": 10
          },
          "children": []
        }
      },
      "events": [
        {
          "src_oc_id": "2",
          "dst_oc_id": "",
          "work_item_id": "201",
          "type": "WI Completed",
          "description": "OC-2 finished WI-201",
          "indicators": {}
        }
      ],
      "aggregating_indicators": {
        "wip": 7,
        "done": 15
      }
    },
    {
      "organization_components": {
        "1": {
          "name": "Tom",
          "description": "Java Software Engineer",
          "id": 1,
          "skills": [
            {
              "name": "Java",
              "proficiency": 1.1
            },
            {
              "name": "C++",
              "proficiency": 1.5
            }
          ],
          "external_queue": [],
          "accepted_queue": [
            201
          ],
          "working_queue": [
            202
          ],
          "indicators": {
            "wip": 4,
            "done": 9,
            "work load": 5
          }
        },
        "2": {
          "name": "Mobile Team",
          "description": "This is Mobile Team",
          "id": 2,
          "skills": [
            {
              "name": "C#",
              "proficiency": 3
            },
            {
              "name": "C",
              "proficiency": 2
            }
          ],
          "external_queue": [],
          "accepted_queue": [
            203
          ],
          "working_queue": [],
          "indicators": {
            "wip": 1,
            "done": 10,
            "work load": 2
          }
        },
        "3": {
          "name": "Server Team",
          "description": "This is Mobile Team",
          "id": 3,
          "skills": [
            {
              "name": "Java",
              "proficiency": 2
            }
          ],
          "external_queue": [
            204
          ],
          "accepted_queue": [],
          "working_queue": [],
          "indicators": {
            "wip": 2,
            "done": 5,
            "work load": 3
          }
        }
      },
      "work_items": {
        "101": {
          "id": "101",
          "name": "Capability 1",
          "type": "capability",
          "description": "this is capability 1",
          "size": [
            20,
            5
          ],
          "skills": [
            "Java",
            "C"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.45,
            "value": 5
          },
          "children": [
            "151"
          ]
        },
        "102": {
          "id": "102",
          "name": "Capability 2",
          "type": "capability",
          "description": "this is capability 2",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.55,
            "value": 5
          },
          "children": [
            "152",
            "153"
          ]
        },
        "151": {
          "id": "151",
          "name": "requirement 1",
          "type": "requirement",
          "description": "this is requirement 1",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.7,
            "value": 10
          },
          "children": [
            "201",
            "202"
          ]
        },
        "152": {
          "id": "152",
          "name": "requirement 2",
          "type": "requirement",
          "description": "this is requirement 2",
          "size": [
            5,
            1
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.6,
            "value": 10
          },
          "children": [
            "202",
            "203"
          ]
        },
        "153": {
          "id": "153",
          "name": "requirement 3",
          "type": "requirement",
          "description": "this is requirement 3",
          "size": [
            10,
            5
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.6,
            "value": 15
          },
          "children": [
            "202",
            "203",
            "204"
          ]
        },
        "201": {
          "id": "201",
          "name": "task 1",
          "type": "task",
          "description": "this is task 1",
          "size": [
            10,
            3
          ],
          "skills": [
            "Java"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.7,
            "value": 20
          },
          "children": []
        },
        "202": {
          "id": "202",
          "name": "task 2",
          "type": "task",
          "description": "this is task 2",
          "size": [
            10,
            3
          ],
          "skills": [
            "JavaScript"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.75,
            "value": 20
          },
          "children": []
        },
        "203": {
          "id": "203",
          "name": "task 3",
          "type": "task",
          "description": "this is task 3",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.45,
            "value": 20
          },
          "children": []
        },
        "204": {
          "id": "204",
          "name": "task 4",
          "type": "task",
          "description": "this is task 4",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.4,
            "value": 10
          },
          "children": []
        }
      },
      "events": [
        {
          "src_oc_id": "2",
          "dst_oc_id": "",
          "work_item_id": "201",
          "type": "WI Completed",
          "description": "OC-2 finished WI-201",
          "indicators": {}
        }
      ],
      "aggregating_indicators": {
        "wip": 7,
        "done": 15
      }
    },
    {
      "organization_components": {
        "1": {
          "name": "Tom",
          "description": "Java Software Engineer",
          "id": 1,
          "skills": [
            {
              "name": "Java",
              "proficiency": 1.1
            },
            {
              "name": "C++",
              "proficiency": 1.5
            }
          ],
          "external_queue": [],
          "accepted_queue": [
            201
          ],
          "working_queue": [
            202
          ],
          "indicators": {
            "wip": 4,
            "done": 9,
            "work load": 5
          }
        },
        "2": {
          "name": "Mobile Team",
          "description": "This is Mobile Team",
          "id": 2,
          "skills": [
            {
              "name": "C#",
              "proficiency": 3
            },
            {
              "name": "C",
              "proficiency": 2
            }
          ],
          "external_queue": [],
          "accepted_queue": [
            203
          ],
          "working_queue": [],
          "indicators": {
            "wip": 1,
            "done": 10,
            "work load": 2
          }
        },
        "3": {
          "name": "Server Team",
          "description": "This is Mobile Team",
          "id": 3,
          "skills": [
            {
              "name": "Java",
              "proficiency": 2
            }
          ],
          "external_queue": [
            204
          ],
          "accepted_queue": [],
          "working_queue": [],
          "indicators": {
            "wip": 2,
            "done": 5,
            "work load": 3
          }
        }
      },
      "work_items": {
        "101": {
          "id": "101",
          "name": "Capability 1",
          "type": "capability",
          "description": "this is capability 1",
          "size": [
            20,
            5
          ],
          "skills": [
            "Java",
            "C"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.45,
            "value": 5
          },
          "children": [
            "151"
          ]
        },
        "102": {
          "id": "102",
          "name": "Capability 2",
          "type": "capability",
          "description": "this is capability 2",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.55,
            "value": 5
          },
          "children": [
            "152",
            "153"
          ]
        },
        "151": {
          "id": "151",
          "name": "requirement 1",
          "type": "requirement",
          "description": "this is requirement 1",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.7,
            "value": 10
          },
          "children": [
            "201",
            "202"
          ]
        },
        "152": {
          "id": "152",
          "name": "requirement 2",
          "type": "requirement",
          "description": "this is requirement 2",
          "size": [
            5,
            1
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.6,
            "value": 10
          },
          "children": [
            "202",
            "203"
          ]
        },
        "153": {
          "id": "153",
          "name": "requirement 3",
          "type": "requirement",
          "description": "this is requirement 3",
          "size": [
            10,
            5
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.6,
            "value": 15
          },
          "children": [
            "202",
            "203",
            "204"
          ]
        },
        "201": {
          "id": "201",
          "name": "task 1",
          "type": "task",
          "description": "this is task 1",
          "size": [
            10,
            3
          ],
          "skills": [
            "Java"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.7,
            "value": 20
          },
          "children": []
        },
        "202": {
          "id": "202",
          "name": "task 2",
          "type": "task",
          "description": "this is task 2",
          "size": [
            10,
            3
          ],
          "skills": [
            "JavaScript"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.75,
            "value": 20
          },
          "children": []
        },
        "203": {
          "id": "203",
          "name": "task 3",
          "type": "task",
          "description": "this is task 3",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.45,
            "value": 20
          },
          "children": []
        },
        "204": {
          "id": "204",
          "name": "task 4",
          "type": "task",
          "description": "this is task 4",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.4,
            "value": 10
          },
          "children": []
        }
      },
      "events": [
        {
          "src_oc_id": "2",
          "dst_oc_id": "",
          "work_item_id": "201",
          "type": "WI Completed",
          "description": "OC-2 finished WI-201",
          "indicators": {}
        }
      ],
      "aggregating_indicators": {
        "wip": 7,
        "done": 15
      }
    },
    {
      "organization_components": {
        "1": {
          "name": "Tom",
          "description": "Java Software Engineer",
          "id": 1,
          "skills": [
            {
              "name": "Java",
              "proficiency": 1.1
            },
            {
              "name": "C++",
              "proficiency": 1.5
            }
          ],
          "external_queue": [],
          "accepted_queue": [
            201
          ],
          "working_queue": [
            202
          ],
          "indicators": {
            "wip": 4,
            "done": 9,
            "work load": 5
          }
        },
        "2": {
          "name": "Mobile Team",
          "description": "This is Mobile Team",
          "id": 2,
          "skills": [
            {
              "name": "C#",
              "proficiency": 3
            },
            {
              "name": "C",
              "proficiency": 2
            }
          ],
          "external_queue": [],
          "accepted_queue": [
            203
          ],
          "working_queue": [],
          "indicators": {
            "wip": 1,
            "done": 10,
            "work load": 2
          }
        },
        "3": {
          "name": "Server Team",
          "description": "This is Mobile Team",
          "id": 3,
          "skills": [
            {
              "name": "Java",
              "proficiency": 2
            }
          ],
          "external_queue": [
            204
          ],
          "accepted_queue": [],
          "working_queue": [],
          "indicators": {
            "wip": 2,
            "done": 5,
            "work load": 3
          }
        }
      },
      "work_items": {
        "101": {
          "id": "101",
          "name": "Capability 1",
          "type": "capability",
          "description": "this is capability 1",
          "size": [
            20,
            5
          ],
          "skills": [
            "Java",
            "C"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.65,
            "value": 5
          },
          "children": [
            "151"
          ]
        },
        "102": {
          "id": "102",
          "name": "Capability 2",
          "type": "capability",
          "description": "this is capability 2",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.7,
            "value": 5
          },
          "children": [
            "152",
            "153"
          ]
        },
        "151": {
          "id": "151",
          "name": "requirement 1",
          "type": "requirement",
          "description": "this is requirement 1",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.8,
            "value": 10
          },
          "children": [
            "201",
            "202"
          ]
        },
        "152": {
          "id": "152",
          "name": "requirement 2",
          "type": "requirement",
          "description": "this is requirement 2",
          "size": [
            5,
            1
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.75,
            "value": 10
          },
          "children": [
            "202",
            "203"
          ]
        },
        "153": {
          "id": "153",
          "name": "requirement 3",
          "type": "requirement",
          "description": "this is requirement 3",
          "size": [
            10,
            5
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.7,
            "value": 15
          },
          "children": [
            "202",
            "203",
            "204"
          ]
        },
        "201": {
          "id": "201",
          "name": "task 1",
          "type": "task",
          "description": "this is task 1",
          "size": [
            10,
            3
          ],
          "skills": [
            "Java"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.8,
            "value": 20
          },
          "children": []
        },
        "202": {
          "id": "202",
          "name": "task 2",
          "type": "task",
          "description": "this is task 2",
          "size": [
            10,
            3
          ],
          "skills": [
            "JavaScript"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.85,
            "value": 20
          },
          "children": []
        },
        "203": {
          "id": "203",
          "name": "task 3",
          "type": "task",
          "description": "this is task 3",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.6,
            "value": 20
          },
          "children": []
        },
        "204": {
          "id": "204",
          "name": "task 4",
          "type": "task",
          "description": "this is task 4",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.65,
            "value": 10
          },
          "children": []
        }
      },
      "events": [
        {
          "src_oc_id": "2",
          "dst_oc_id": "",
          "work_item_id": "201",
          "type": "WI Completed",
          "description": "OC-2 finished WI-201",
          "indicators": {}
        }
      ],
      "aggregating_indicators": {
        "wip": 7,
        "done": 15
      }
    },
    {
      "organization_components": {
        "1": {
          "name": "Tom",
          "description": "Java Software Engineer",
          "id": 1,
          "skills": [
            {
              "name": "Java",
              "proficiency": 1.1
            },
            {
              "name": "C++",
              "proficiency": 1.5
            }
          ],
          "external_queue": [],
          "accepted_queue": [
            201
          ],
          "working_queue": [
            202
          ],
          "indicators": {
            "wip": 4,
            "done": 9,
            "work load": 5
          }
        },
        "2": {
          "name": "Mobile Team",
          "description": "This is Mobile Team",
          "id": 2,
          "skills": [
            {
              "name": "C#",
              "proficiency": 3
            },
            {
              "name": "C",
              "proficiency": 2
            }
          ],
          "external_queue": [],
          "accepted_queue": [
            203
          ],
          "working_queue": [],
          "indicators": {
            "wip": 1,
            "done": 10,
            "work load": 2
          }
        },
        "3": {
          "name": "Server Team",
          "description": "This is Mobile Team",
          "id": 3,
          "skills": [
            {
              "name": "Java",
              "proficiency": 2
            }
          ],
          "external_queue": [
            204
          ],
          "accepted_queue": [],
          "working_queue": [],
          "indicators": {
            "wip": 2,
            "done": 5,
            "work load": 3
          }
        }
      },
      "work_items": {
        "101": {
          "id": "101",
          "name": "Capability 1",
          "type": "capability",
          "description": "this is capability 1",
          "size": [
            20,
            5
          ],
          "skills": [
            "Java",
            "C"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.95,
            "value": 5
          },
          "children": [
            "151"
          ]
        },
        "102": {
          "id": "102",
          "name": "Capability 2",
          "type": "capability",
          "description": "this is capability 2",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.9,
            "value": 5
          },
          "children": [
            "152",
            "153"
          ]
        },
        "151": {
          "id": "151",
          "name": "requirement 1",
          "type": "requirement",
          "description": "this is requirement 1",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.95,
            "value": 10
          },
          "children": [
            "201",
            "202"
          ]
        },
        "152": {
          "id": "152",
          "name": "requirement 2",
          "type": "requirement",
          "description": "this is requirement 2",
          "size": [
            5,
            1
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.9,
            "value": 10
          },
          "children": [
            "202",
            "203"
          ]
        },
        "153": {
          "id": "153",
          "name": "requirement 3",
          "type": "requirement",
          "description": "this is requirement 3",
          "size": [
            10,
            5
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.9,
            "value": 15
          },
          "children": [
            "202",
            "203",
            "204"
          ]
        },
        "201": {
          "id": "201",
          "name": "task 1",
          "type": "task",
          "description": "this is task 1",
          "size": [
            10,
            3
          ],
          "skills": [
            "Java"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.8,
            "value": 20
          },
          "children": []
        },
        "202": {
          "id": "202",
          "name": "task 2",
          "type": "task",
          "description": "this is task 2",
          "size": [
            10,
            3
          ],
          "skills": [
            "JavaScript"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.95,
            "value": 20
          },
          "children": []
        },
        "203": {
          "id": "203",
          "name": "task 3",
          "type": "task",
          "description": "this is task 3",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.8,
            "value": 20
          },
          "children": []
        },
        "204": {
          "id": "204",
          "name": "task 4",
          "type": "task",
          "description": "this is task 4",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 0.75,
            "value": 10
          },
          "children": []
        }
      },
      "events": [
        {
          "src_oc_id": "2",
          "dst_oc_id": "",
          "work_item_id": "201",
          "type": "WI Completed",
          "description": "OC-2 finished WI-201",
          "indicators": {}
        }
      ],
      "aggregating_indicators": {
        "wip": 7,
        "done": 15
      }
    },
    {
      "organization_components": {
        "1": {
          "name": "Tom",
          "description": "Java Software Engineer",
          "id": 1,
          "skills": [
            {
              "name": "Java",
              "proficiency": 1.1
            },
            {
              "name": "C++",
              "proficiency": 1.5
            }
          ],
          "external_queue": [],
          "accepted_queue": [
            201
          ],
          "working_queue": [
            202
          ],
          "indicators": {
            "wip": 4,
            "done": 9,
            "work load": 5
          }
        },
        "2": {
          "name": "Mobile Team",
          "description": "This is Mobile Team",
          "id": 2,
          "skills": [
            {
              "name": "C#",
              "proficiency": 3
            },
            {
              "name": "C",
              "proficiency": 2
            }
          ],
          "external_queue": [],
          "accepted_queue": [
            203
          ],
          "working_queue": [],
          "indicators": {
            "wip": 1,
            "done": 10,
            "work load": 2
          }
        },
        "3": {
          "name": "Server Team",
          "description": "This is Mobile Team",
          "id": 3,
          "skills": [
            {
              "name": "Java",
              "proficiency": 2
            }
          ],
          "external_queue": [
            204
          ],
          "accepted_queue": [],
          "working_queue": [],
          "indicators": {
            "wip": 2,
            "done": 5,
            "work load": 3
          }
        }
      },
      "work_items": {
        "101": {
          "id": "101",
          "name": "Capability 1",
          "type": "capability",
          "description": "this is capability 1",
          "size": [
            20,
            5
          ],
          "skills": [
            "Java",
            "C"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 1,
            "value": 5
          },
          "children": [
            "151"
          ]
        },
        "102": {
          "id": "102",
          "name": "Capability 2",
          "type": "capability",
          "description": "this is capability 2",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 1,
            "value": 5
          },
          "children": [
            "152",
            "153"
          ]
        },
        "151": {
          "id": "151",
          "name": "requirement 1",
          "type": "requirement",
          "description": "this is requirement 1",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 1,
            "value": 10
          },
          "children": [
            "201",
            "202"
          ]
        },
        "152": {
          "id": "152",
          "name": "requirement 2",
          "type": "requirement",
          "description": "this is requirement 2",
          "size": [
            5,
            1
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 1,
            "value": 10
          },
          "children": [
            "202",
            "203"
          ]
        },
        "153": {
          "id": "153",
          "name": "requirement 3",
          "type": "requirement",
          "description": "this is requirement 3",
          "size": [
            10,
            5
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 1,
            "value": 15
          },
          "children": [
            "202",
            "203",
            "204"
          ]
        },
        "201": {
          "id": "201",
          "name": "task 1",
          "type": "task",
          "description": "this is task 1",
          "size": [
            10,
            3
          ],
          "skills": [
            "Java"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 1,
            "value": 20
          },
          "children": []
        },
        "202": {
          "id": "202",
          "name": "task 2",
          "type": "task",
          "description": "this is task 2",
          "size": [
            10,
            3
          ],
          "skills": [
            "JavaScript"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 1,
            "value": 20
          },
          "children": []
        },
        "203": {
          "id": "203",
          "name": "task 3",
          "type": "task",
          "description": "this is task 3",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 1,
            "value": 20
          },
          "children": []
        },
        "204": {
          "id": "204",
          "name": "task 4",
          "type": "task",
          "description": "this is task 4",
          "size": [
            10,
            3
          ],
          "skills": [
            "C#"
          ],
          "assigned_to": "",
          "indicators": {
            "completeness": 1,
            "value": 10
          },
          "children": []
        }
      },
      "events": [
        {
          "src_oc_id": "2",
          "dst_oc_id": "",
          "work_item_id": "201",
          "type": "WI Completed",
          "description": "OC-2 finished WI-201",
          "indicators": {}
        }
      ],
      "aggregating_indicators": {
        "wip": 7,
        "done": 15
      }
    }
  ]
};