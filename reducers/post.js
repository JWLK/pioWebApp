export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '00성형외과',
    },
    content: '수술실 간호사 및 간호조무사 채용',
    Images: [{
      src: 'https://www.e-dream.co.kr/m/img/sub/intro_mb01_0107.jpg',
    }, {
      src: 'http://www.e-dream.co.kr/mpboard/upload/1545376320.jpg.save',
    }],
    Comments: [{
      User: {
        nickname: 'nero',
      },
      content: '우와 개정판이 나왔군요~',
    }, {
      User: {
        nickname: 'hero',
      },
      content: '얼른 사고싶어요~',
    }]
  },{
    id: 2,
    User: {
      id: 1,
      nickname: '00성형외과',
    },
    content: '수술실 간호사 및 간호조무사 채용',
    Images: [{
      src: 'https://www.e-dream.co.kr/m/img/sub/intro_mb01_0107.jpg',
    }, {
      src: 'http://www.e-dream.co.kr/mpboard/upload/1545376320.jpg.save',
    }],
    Comments: [{
      User: {
        nickname: 'nero',
      },
      content: '우와 개정판이 나왔군요~',
    }, {
      User: {
        nickname: 'hero',
      },
      content: '얼른 사고싶어요~',
    }]
  },{
    id: 3,
    User: {
      id: 1,
      nickname: '00성형외과',
    },
    content: '수술실 간호사 및 간호조무사 채용',
    Images: [{
      src: 'https://www.e-dream.co.kr/m/img/sub/intro_mb01_0107.jpg',
    }, {
      src: 'http://www.e-dream.co.kr/mpboard/upload/1545376320.jpg.save',
    }],
    Comments: [{
      User: {
        nickname: 'nero',
      },
      content: '우와 개정판이 나왔군요~',
    }, {
      User: {
        nickname: 'hero',
      },
      content: '얼른 사고싶어요~',
    }]
  },{
    id: 4,
    User: {
      id: 1,
      nickname: '00성형외과',
    },
    content: '수술실 간호사 및 간호조무사 채용',
    Images: [{
      src: 'https://www.e-dream.co.kr/m/img/sub/intro_mb01_0107.jpg',
    }, {
      src: 'http://www.e-dream.co.kr/mpboard/upload/1545376320.jpg.save',
    }],
    Comments: [{
      User: {
        nickname: 'nero',
      },
      content: '우와 개정판이 나왔군요~',
    }, {
      User: {
        nickname: 'hero',
      },
      content: '얼른 사고싶어요~',
    }]
  },{
    id: 5,
    User: {
      id: 1,
      nickname: '00성형외과',
    },
    content: '수술실 간호사 및 간호조무사 채용',
    Images: [{
      src: 'https://www.e-dream.co.kr/m/img/sub/intro_mb01_0107.jpg',
    }, {
      src: 'http://www.e-dream.co.kr/mpboard/upload/1545376320.jpg.save',
    }],
    Comments: [{
      User: {
        nickname: 'nero',
      },
      content: '우와 개정판이 나왔군요~',
    }, {
      User: {
        nickname: 'hero',
      },
      content: '얼른 사고싶어요~',
    }]
  }],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = 'ADD_POST';

export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: '더미데이터입니다.',
  User: {
    id: 1,
    nickname: '제로초',
  },
  Images: [],
  Comments: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
