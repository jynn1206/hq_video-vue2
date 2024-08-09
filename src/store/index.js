import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ws: null,
    messages: []
  },
  mutations: {
    SET_WEBSOCKET(state, ws) {
      state.ws = ws;
    },
    ADD_MESSAGE(state, message) {
      state.messages.push(message);
    }
  },
  actions: {
    initWebSocket({ commit, state }, userId) {
      if (state.ws) {
        state.ws.close();  // 关闭已有的 WebSocket 连接
      }

      const url = `ws://127.0.0.1:7763/websocket/${userId}`;
      const ws = new WebSocket(url);

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        commit('ADD_MESSAGE', message);
      };

      commit('SET_WEBSOCKET', ws);
    },
    sendMessage({ state, dispatch }, { message, userId }) {
      if (!state.ws || state.ws.readyState !== WebSocket.OPEN) {
        // 重新初始化 WebSocket 连接
        dispatch('initWebSocket', userId);
      }

      state.ws.onopen = () => {
        state.ws.send(JSON.stringify(message));
      };

      // 如果 WebSocket 连接已经打开，则直接发送消息
      if (state.ws.readyState === WebSocket.OPEN) {
        state.ws.send(JSON.stringify(message));
      }
    }
  }
});

