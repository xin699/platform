      // 双联动日期示例
      function linkage(first, last) {
          var dateFirst = $(first);
          var dateLast = $(last);
          var dateFirstApi;
          var dateLastApi;

          dateFirst.cxCalendar({
              type: 'datetime',
              format: 'YYYY-MM-DD HH:mm:ss'
          }, function (api) {
              dateFirstApi = api;
          });

          dateFirst.focus(function(){
            $(document).off('focusin')
          })

          dateLast.cxCalendar({
              type: 'datetime',
              format: 'YYYY-MM-DD HH:mm:ss'
          }, function (api) {
              dateLastApi = api;
          });

          dateFirst.bind('change', function () {

              var firstTime = parseInt(dateFirstApi.getDate('TIME'), 10);
            //   var lastTime = parseInt(dateLastApi.getDate('TIME'), 10);

            //   console.log(firstTime,lastTime)

            //   if (lastTime <= firstTime) {
            //       dateLastApi.clearDate();
            //   };
            // console.log(firstTime)

              dateLastApi.setOptions({
                  startDate: firstTime - 86400000
              });

            //   console.log(dateLastApi)
              dateLastApi.show();
          });

      }