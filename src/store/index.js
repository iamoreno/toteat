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
