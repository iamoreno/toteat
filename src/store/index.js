import Vue from "vue";
import Vuex from "vuex";
import DataService from "@/services/DataService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: []
  },
  mutations: {
    getData(state) {
      DataService.getData()
        .then(response => {
          state.data = response.data;
          state.data.forEach(item => {
            const closed = new Date(item.date_closed);
            const open = new Date(item.date_opened);
            item.date_closed = closed;
            item.date_opened = open;
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  actions: {
    getData(context) {
      context.commit("getData");
    }
  },
  modules: {},
  getters: {
    waitersInformation(state) {
      let dict = {};
      state.data.forEach(item => {
        if (item.waiter in dict) {
          dict[item.waiter].orders += 1;
          dict[item.waiter].income += item.total;
        } else {
          dict[item.waiter] = {
            name: item.waiter,
            orders: 1,
            income: item.total
          };
        }
      });
      let lista = [];
      Object.keys(dict).forEach(key => {
        dict[key].averageIncome = Math.round(
          dict[key].income / dict[key].orders
        );
        lista.push(dict[key]);
      });
      return lista;
    },
    cashiersInformation(state) {
      let dict = {};
      state.data.forEach(item => {
        if (item.cashier in dict) {
          dict[item.cashier].orders += 1;
          dict[item.cashier].income += item.total;
        } else {
          dict[item.cashier] = {
            name: item.cashier,
            orders: 1,
            income: item.total
          };
        }
      });
      let lista = [];
      Object.keys(dict).forEach(key => {
        lista.push(dict[key]);
      });
      return lista;
    },
    paymentsInformation(state) {
      let dict = {};
      state.data.forEach(item => {
        item.payments.forEach(payment => {
          if (payment.type in dict) {
            dict[payment.type][1] += payment.amount;
          } else {
            dict[payment.type] = [payment.type, payment.amount];
          }
        });
      });
      let labels = [];
      let data = [];
      Object.keys(dict).forEach(key => {
        labels.push(dict[key][0]);
        data.push(dict[key][1]);
      });
      return [labels, data];
    },
    zoneInformation(state) {
      let dict = {};
      const minuts = 1000 * 60;
      state.data.forEach(item => {
        if (item.zone in dict) {
          dict[item.zone].orders += 1;
          dict[item.zone].income += item.total;
          dict[item.zone].time +=
            (item.date_closed.getTime() - item.date_opened.getTime()) / minuts;
        } else {
          dict[item.zone] = {
            name: item.zone,
            orders: 1,
            income: item.total,
            time:
              (item.date_closed.getTime() - item.date_opened.getTime()) / minuts
          };
        }
      });
      let lista = [];
      Object.keys(dict).forEach(key => {
        dict[key].averageIncome = Math.round(
          dict[key].income / dict[key].orders
        );
        dict[key].averageTime = Math.round(dict[key].time / dict[key].orders);
        lista.push(dict[key]);
      });
      return lista;
    },
    productsInformation(state) {
      let dict = {};
      state.data.forEach(item => {
        item.products.forEach(product => {
          if (product.name in dict) {
            dict[product.name].income += product.price * product.quantity;
            dict[product.name].quantity += product.quantity;
          } else {
            dict[product.name] = {
              name: product.name,
              category: product.category,
              price: product.price,
              quantity: product.quantity,
              income: product.price * product.quantity
            };
          }
        });
      });
      let lista = [];
      Object.keys(dict).forEach(key => {
        lista.push(dict[key]);
      });
      return lista;
    },
    dailyIncomeInformation(state) {
      const days = {
        0: "Domingo",
        1: "Lunes",
        2: "Martes",
        3: "Miércoles",
        4: "Jueves",
        5: "Viernes",
        6: "Sábado"
      };
      let dict = {};
      state.data.forEach(item => {
        if (item.date_closed.getDay() in dict) {
          dict[item.date_closed.getDay()][1] += item.total;
          dict[item.date_closed.getDay()][2] += 1;
        } else {
          dict[item.date_closed.getDay()] = [
            days[item.date_closed.getDay()],
            item.total,
            1
          ];
        }
      });
      let daysList = [];
      let dataList = [];
      let orderList = [];
      let averageList = [];
      Object.keys(dict).forEach(key => {
        dict[key].push(Math.round(dict[key][1] / dict[key][2]));
        daysList.push(dict[key][0]);
        dataList.push(dict[key][1]);
        orderList.push(dict[key][2]);
        averageList.push(dict[key][3]);
      });
      let list = [daysList, dataList, orderList, averageList];
      return list;
    },
    monthlyIncomeInformation(state) {
      const Months = {
        0: "Enero",
        1: "Febrero",
        2: "Marzo",
        3: "Abril",
        4: "Mayo",
        5: "Junio",
        6: "Julio",
        7: "Agosto",
        8: "Septiembre",
        9: "Octubre",
        10: "Noviembre",
        11: "Diciembre"
      };
      let dict = {};
      state.data.forEach(item => {
        if (item.date_closed.getMonth() in dict) {
          dict[item.date_closed.getMonth()][1] += item.total;
          dict[item.date_closed.getMonth()][2] += 1;
        } else {
          dict[item.date_closed.getMonth()] = [
            Months[item.date_closed.getMonth()],
            item.total,
            1
          ];
        }
      });
      let monthsList = [];
      let dataList = [];
      let orderList = [];
      let averageList = [];
      Object.keys(dict).forEach(key => {
        dict[key].push(Math.round(dict[key][1] / dict[key][2]));
        monthsList.push(dict[key][0]);
        dataList.push(dict[key][1]);
        orderList.push(dict[key][2]);
        averageList.push(dict[key][3]);
      });
      let list = [monthsList, dataList, orderList, averageList];
      return list;
    },
    hourlyIncomeInformation(state) {
      const hours = {
        0: "00:00-00:59",
        1: "01:00-01:59",
        2: "02:00-02:59",
        3: "03:00-03:59",
        4: "04:00-04:59",
        5: "05:00-05:59",
        6: "06:00-06:59",
        7: "07:00-07:59",
        8: "08:00-08:59",
        9: "09:00-09:59",
        10: "10:00-10:59",
        11: "11:00-11:59",
        12: "12:00-12:59",
        13: "13:00-13:59",
        14: "14:00-14:59",
        15: "15:00-15:59",
        16: "16:00-16:59",
        17: "17:00-17:59",
        18: "18:00-18:59",
        19: "19:00-19:59",
        20: "20:00-20:59",
        21: "21:00-21:59",
        22: "22:00-22:59",
        23: "23:00-23:59"
      };
      let dict = {};
      state.data.forEach(item => {
        if (item.date_closed.getHours() in dict) {
          dict[item.date_closed.getHours()][1] += item.total;
          dict[item.date_closed.getHours()][2] += 1;
        } else {
          dict[item.date_closed.getHours()] = [
            hours[item.date_closed.getHours()],
            item.total,
            1
          ];
        }
      });
      let hoursList = [];
      let dataList = [];
      let orderList = [];
      let averageList = [];
      Object.keys(dict).forEach(key => {
        dict[key].push(Math.round(dict[key][1] / dict[key][2]));
        hoursList.push(dict[key][0]);
        dataList.push(dict[key][1]);
        orderList.push(dict[key][2]);
        averageList.push(dict[key][3]);
      });
      let list = [hoursList, dataList, orderList, averageList];
      return list;
    },
    averageStay(state) {
      let dict = {};
      const minuts = 1000 * 60;
      state.data.forEach(item => {
        dict[item.id] = [
          item.id,
          item.zone,
          item.diners,
          item.total,
          (item.date_closed.getTime() - item.date_opened.getTime()) / minuts
        ];
      });
      return dict;
    }
  }
});
