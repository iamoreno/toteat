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
          console.log(state.data);
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
    waiterInformation(state) {
      let dict = {};
      state.data.forEach(item => {
        if (item.waiter in dict) {
          dict[item.waiter][1] += 1;
          dict[item.waiter][2] += item.total;
        } else {
          dict[item.waiter] = [item.waiter, 1, item.total];
        }
      });
      return dict;
    },
    cashierInformation(state) {
      let dict = {};
      state.data.forEach(item => {
        if (item.cashier in dict) {
          dict[item.cashier][1] += 1;
          dict[item.cashier][2] += item.total;
        } else {
          dict[item.cashier] = [item.cashier, 1, item.total];
        }
      });
      return dict;
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
      return dict;
    },
    zoneInformation(state) {
      let dict = {};
      state.data.forEach(item => {
        if (item.zone in dict) {
          dict[item.zone][1] += 1;
          dict[item.zone][2] += item.total;
        } else {
          dict[item.zone] = [item.zone, 1, item.total];
        }
      });
      return dict;
    },
    productsInformation(state) {
      let dict = {};
      state.data.forEach(item => {
        item.products.forEach(product => {
          if (product.name in dict) {
            dict[product.name][4] += product.price * product.quantity;
            dict[product.name][3] += product.quantity;
          } else {
            dict[product.name] = [
              product.name,
              product.category,
              product.price,
              product.quantity,
              product.price * product.quantity
            ];
          }
        });
      });
      return dict;
    },
    dailyIncomeInformation(state) {
      const days = {
        0: "Domingo",
        1: "Lunes",
        2: "Martes",
        3: "Miércoles",
        4: "Juevas",
        5: "Viernes",
        6: "Sábado"
      };
      let dict = {};
      state.data.forEach(item => {
        if (item.date_closed.getDay() in dict) {
          dict[item.date_closed.getDay()][1] += item.total;
        } else {
          dict[item.date_closed.getDay()] = [
            days[item.date_closed.getDay()],
            item.total
          ];
        }
      });
      return dict;
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
        } else {
          dict[item.date_closed.getMonth()] = [
            Months[item.date_closed.getMonth()],
            item.total
          ];
        }
      });
      console.log(dict);
      return dict;
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
