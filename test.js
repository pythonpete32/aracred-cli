̉
/*
const string =`   '[\n  {\n    "type": "sourcecred/cli/scores",\n    "version": "0.2.0"\n  },\n  {\n    "intervals": [\n      {\n        "endTimeMs": 1583020800000,\n        "startTimeMs": 1582416000000\n      },\n      {\n        "endTimeMs": 1583625600000,\n        "startTimeMs": 1583020800000\n      }\n    ],\n    "users": [\n      {\n        "address": [\n          "sourcecred",\n          "github",\n          "USERLIKE",\n          "USER",\n          "pythonpete32"\n        ],\n        "intervalCred": [\n          5.5,\n          6.749999999999999\n        ],\n        "totalCred": 12.25\n      }\n    ]\n  }\n]'`
const transform = string.replace(/(\r\n|\n|\r)/gm, "").replace(/ /g,'')
const json = JSON.parse(`{`+`"data":` + transform.substring(1, transform.length - 1) + `}`)


console.log(json)
*/

data = [{
    "type": "sourcecred/cli/scores",
    "version": "0.2.0"
  },
  {
    "intervals": [{
        "endTimeMs": 1579996800000,
        "startTimeMs": 1579392000000
      },
      {
        "endTimeMs": 1580601600000,
        "startTimeMs": 1579996800000
      },
      {
        "endTimeMs": 1581206400000,
        "startTimeMs": 1580601600000
      },
      {
        "endTimeMs": 1581811200000,
        "startTimeMs": 1581206400000
      },
      {
        "endTimeMs": 1582416000000,
        "startTimeMs": 1581811200000
      },
      {
        "endTimeMs": 1583020800000,
        "startTimeMs": 1582416000000
      },
      {
        "endTimeMs": 1583625600000,
        "startTimeMs": 1583020800000
      },
      {
        "endTimeMs": 1584230400000,
        "startTimeMs": 1583625600000
      }
    ],
    "users": [{
        "address": [
          "sourcecred",
          "discourse",
          "user",
          "https://port.oceanprotocol.com",
          "system"
        ],
        "intervalCred": [
          0,
          9.269419066050713,
          8.51252082869089,
          4.255268019213263,
          2.1266405084782867,
          0.9942723561913337,
          0.6511838087604973,
          0.2756814195026922
        ],
        "totalCred": 26.084986006887675
      },
      {
        "address": [
          "sourcecred",
          "discourse",
          "user",
          "https://port.oceanprotocol.com",
          "Lrt"
        ],
        "intervalCred": [
          0,
          4.0286625453492547e-7,
          2.2139334363160582e-10,
          1.996668677575779e-12,
          1.4424073288119378e-14,
          1.901230895896261,
          3.9500366247108585,
          11.218155741361542
        ],
        "totalCred": 17.06942366505832
      },
      {
        "address": [
          "sourcecred",
          "discourse",
          "user",
          "https://port.oceanprotocol.com",
          "Simon"
        ],
        "intervalCred": [
          0,
          2.2157339932107,
          1.4753804476479662,
          0.738181481439126,
          0.36958263791867463,
          0.1734125562035759,
          0.26029513345613986,
          1.339284029506989
        ],
        "totalCred": 6.571870279383171
      },
      {
        "address": [
          "sourcecred",
          "discourse",
          "user",
          "https://port.oceanprotocol.com",
          "santteegt"
        ],
        "intervalCred": [
          0,
          4.0286625453492547e-7,
          2.2139334363160582e-10,
          1.996668677575779e-12,
          1.4424073288119378e-14,
          0.18685603309394677,
          0.9198810144554889,
          4.175787796876324
        ],
        "totalCred": 5.2825252475154185
      },
      {
        "address": [
          "sourcecred",
          "discourse",
          "user",
          "https://port.oceanprotocol.com",
          "Matthew"
        ],
        "intervalCred": [
          0,
          2.514845732139823,
          1.0120987229969627,
          0.5065504993416209,
          0.25377685360299584,
          0.11922815861488271,
          0.09521581036694883,
          0.03975173415003155
        ],
        "totalCred": 4.541467511213265
      },
      {
        "address": [
          "sourcecred",
          "discourse",
          "user",
          "https://port.oceanprotocol.com",
          "Robin"
        ],
        "intervalCred": [
          0,
          4.0286625453492547e-7,
          2.2139334363160582e-10,
          1.996668677575779e-12,
          1.4424073288119378e-14,
          2.1106566041657307e-20,
          1.8108876082500656,
          1.9550963832817214
        ],
        "totalCred": 3.765984394621446
      },
      {
        "address": [
          "sourcecred",
          "discourse",
          "user",
          "https://port.oceanprotocol.com",
          "NiMA"
        ],
        "intervalCred": [
          0,
          9.228550831017915e-193,
          1.272248541444093e-289,
          0,
          0,
          0,
          0,
          2.8399928953207008
        ],
        "totalCred": 2.8399928953207008
      }
    ]
  }
]

cred = []
data[1].users.map((element) => {
  cred.push([element.address[4], element.totalCred])
})
console.log(cred)