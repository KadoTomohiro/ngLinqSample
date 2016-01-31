(function() {
  'use sttrict';

  angular.module('myApp', [
      'angular-linq'
    ])
    .controller('mainController', MainController);

  MainController.$inject = [
    '$linq'
  ];

  function MainController($linq) {
    this.title = "Angular Linq Sample";
    this.templates = data.templates;

    this.questions = $linq.Enumerable()
      .From(this.templates['enquete1'].questions)
      .Where(q => q.Value.require)
      .Select(q => {
        return {
          no: q.Key,
          title: q.Value.question
        }
      })
      .ToArray();

    this.groups = $linq.Enumerable()
      .From(this.templates['enquete1'].questions)
      .GroupBy(q => {
        console.log("1:", q);
        return q.Value.group;
      }, q => {
        console.log("2:", q);
        return q;
      }, (g, q) => {
        console.log("3:", g, q.source);
        return {key: g, value: q.source};
      })
      .ToArray();

    console.log(this.groups);
  }

  var data = {
    "users": { // user list
      "user1": { // uid
        "name": "KadoTomohiro" // userName
      }, //  ...
    },
    "templates": {　 // temolate list
      "enquete1": { // enqueteId
        "auther": "user1",
        "title": "セミナーについて",
        "discription": "セミナーについてのご意見をお聞かせください",
        "groups": {
          "group1": {
            "discription": "受講者情報"
          },
          "group2": {
            "discription": "セミナーについて"
          }
        },
        "questions": {
          "Q1": { // question no
            "question": "氏名",
            "group": "group1",
            "type": "text",
            "format": "text",
            "require": true
          },
          "Q2": {
            "question": "所属",
            "group": "group1",
            "type": "select",
            "format": "single",
            "items": ["JA", "アグリ", "モバイル", "IDC", "営業", "金融"],
            "require": true,
          },
          "Q3": {
            "question": "セミナーに参加した目的を教えてください",
            "group": "group2",
            "type": "select",
            "format": "mulch",
            "items": ["業務活用のため", "お客様提案のため", "学習のため"],
            "require": true
          },
          "Q4": {
            "question": "セミナーに参加した目的は達成できましたか",
            "group": "group2",
            "type": "select",
            "format": "mulch",
            "items": ["達成できた", "概ね達成できた", "あまり達成できなかった", "達成できなかった"],
            "require": false
          }
        }
      }
    },
    "answers": {

    }
  }


})();
