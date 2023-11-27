export const groupMarkers = [
  {
    title: '홍대 개미',
    writer: '작성자',
    date: '2023-10-12',
    fav: true,
    latitude: 0,
    longitude: 1,
    groupId: 1, // groupId 추가
    groupTitle: '그룹 1', // groupTitle 추가
    id: 'marker-1',
  },
  {
    title: '피오니',
    writer: '작성자',
    date: '2023-10-8',
    fav: true,
    latitude: 0,
    longitude: 1,
    groupId: 1, // groupId 추가
    groupTitle: '그룹 1', // groupTitle 추가
    id: 'marker-10',
  },
  {
    title: '탕후루',
    writer: '작성자',
    date: '2023-10-4',
    fav: true,
    latitude: 0,
    longitude: 1,
    groupId: 2, // groupId 추가
    groupTitle: '그룹 2', // groupTitle 추가
    id: 'marker-2',
  },
  {
    title: '현우동',
    writer: '작성자',
    date: '2023-10-4',
    fav: true,
    latitude: 0,
    longitude: 1,
    groupId: 2, // groupId 추가
    groupTitle: '그룹 2', // groupTitle 추가
    id: 'marker-4',
  },
  {
    title: '슈붕 파는 곳',
    writer: '작성자',
    date: '2023-11-24',
    fav: true,
    latitude: 129.3527160452505,
    longitude: 36.55301345250451,
    groupId: 3, // groupId 추가
    groupTitle: '그룹 3', // groupTitle 추가
    id: 'marker-5',
  },
  {
    title: '파주 영어마을',
    writer: '작성자',
    date: '2023-11-4',
    fav: true,
    latitude: 126.9800555492665,
    longitude: 34.85039496318441,
    groupId: 3, // groupId 추가
    groupTitle: '그룹 3', // groupTitle 추가
    id: 'marker-7',
  },
  {
    title: '파주 곱창',
    writer: '작성자',
    date: '2023-12-7',
    fav: true,
    latitude: 126.56835196261218,
    longitude: 38.48065965979165,
    groupId: 3, // groupId 추가
    groupTitle: '그룹 3', // groupTitle 추가
    id: 'marker-8',
  },
  {
    title: '파주 꼼장어',
    writer: '작성자',
    date: '2023-11-25',
    fav: true,
    latitude: 127.75828552436943,
    longitude: 35.461804891194504,
    groupId: 3, // groupId 추가
    groupTitle: '그룹 3', // groupTitle 추가
    id: 'marker-9',
  },
];

export const groups = [
  { groupId: 1, groupTitle: '그룹 1' },
  { groupId: 2, groupTitle: '그룹 2' },
  { groupId: 3, groupTitle: '그룹 3' },
  // 다른 그룹을 필요한 만큼 추가할 수 있습니다.
];
export const routeMaker = [
  {
    id: 1,
    routeMaker: '홍삼윤님',
    title: '홍삼의3',
    wentDate: '2023-11-05T12:00:00',
    memo: '홍삼의3',
    markers: [
      {
        id: 1,
        title: '홍삼마커1',
        memo: '홍삼의바보',
        location: {
          latitude: 35.19754414695399,
          longitude: 128.1671744126717,
        },
        visiable: false,
        wentDate: '2023-11-02T',
        imageUrl: [
          'https://i.pinimg.com/564x/a4/ac/dd/a4acdd0fc741bf7ee7ffaeb3ed87dbee.jpg',
          'https://i.pinimg.com/736x/17/f6/3e/17f63ecacff59cfd166f40b49b9bfd8c.jpg',
          'https://i.pinimg.com/564x/f6/9b/db/f69bdbd6be8b9046b0fb5ddec940774c.jpg',
        ],
      },
      {
        id: 2,
        title: '홍삼마커2',
        memo: '홍삼마커내용2',
        location: {
          latitude: 35.461804891194504,
          longitude: 127.75828552436943,
        },
        visiable: false,
        wentDate: '2023-11-02T15:30:00',
        imageUrl: [
          'https://i.pinimg.com/564x/a4/ac/dd/a4acdd0fc741bf7ee7ffaeb3ed87dbee.jpg',
          'https://i.pinimg.com/736x/17/f6/3e/17f63ecacff59cfd166f40b49b9bfd8c.jpg',
          'https://i.pinimg.com/564x/f6/9b/db/f69bdbd6be8b9046b0fb5ddec940774c.jpg',
        ],
      },
      {
        id: 3,
        title: '홍삼마커3',
        memo: '홍삼마커내용3',
        location: {
          latitude: 36.19754414695399,
          longitude: 127.1671744126717,
        },
        visiable: false,
        wentDate: '2023-11-02T15:30:00',
        imageUrl: [
          'https://remindmap-bucket.s3.ap-northeast-2.amazonaws.com/marker/1_1700943691429.png',
        ],
      },
    ],
  },
  {
    id: 2,
    routeMaker: '홍삼님',
    title: '홍삼2',
    wentDate: '2023-11-05T12:00:00',
    memo: '홍삼의2',
    markers: [
      {
        id: 1,
        title: '홍삼마커1',
        memo: '홍삼마커내용1',
        location: {
          latitude: 35.99754414695399,
          longitude: 126.6671744126717,
        },
        visiable: false,
        wentDate: '2023-11-02T15:30:00',
        imageUrl: [
          'https://remindmap-bucket.s3.ap-northeast-2.amazonaws.com/marker/1_1700943691429.png',
        ],
      },
      {
        id: 4,
        title: '홍커4',
        memo: '홍삼용4',
        location: {
          latitude: 36.78754414695399,
          longitude: 128.1671744126717,
        },
        visiable: false,
        wentDate: '2023-11-02T15:30:00',
        imageUrl: [
          'https://remindmap-bucket.s3.ap-northeast-2.amazonaws.com/marker/1_1700943691429.png',
        ],
      },
      {
        id: 5,
        title: '홍삼마커5',
        memo: '홍삼내용5',
        location: {
          latitude: 36.69754414695399,
          longitude: 126.4671744126717,
        },
        visiable: false,
        wentDate: '2023-11-02T15:30:00',
        imageUrl: [
          'https://remindmap-bucket.s3.ap-northeast-2.amazonaws.com/marker/1_1700943691429.png',
        ],
      },
    ],
  },
  {
    id: 2,
    routeMaker: '홍수님',
    title: '홍삼트2',
    wentDate: '2023-11-05T12:00:00',
    memo: '홍삼의2',
    markers: [
      {
        id: 1,
        title: '홍삼1',
        memo: '홍삼1',
        location: {
          latitude: 36.19754414695399,
          longitude: 127.1671744126717,
        },
        visiable: false,
        wentDate: '2023-11-02T15:30:00',
        imageUrl: [
          'https://remindmap-bucket.s3.ap-northeast-2.amazonaws.com/marker/1_1700943691429.png',
        ],
      },
      {
        id: 4,
        title: '홍삼4',
        memo: '홍삼4',
        location: {
          latitude: 36.39754414695399,
          longitude: 126.8671744126717,
        },
        visiable: false,
        wentDate: '2023-11-02T15:30:00',
        imageUrl: [
          'https://remindmap-bucket.s3.ap-northeast-2.amazonaws.com/marker/1_1700943691429.png',
        ],
      },
      {
        id: 5,
        title: '홍삼2',
        memo: '홍삼3',
        location: {
          latitude: 36.19754414695399,
          longitude: 126.6671744126717,
        },
        visiable: false,
        wentDate: '2023-11-02T15:30:00',
        imageUrl: [
          'https://remindmap-bucket.s3.ap-northeast-2.amazonaws.com/marker/1_1700943691429.png',
        ],
      },
    ],
  },
  {
    id: 2,
    routeMaker: '이요나당!',
    title: '우리끝이당!',
    wentDate: '2023-11-28T12:00:00',
    memo: '홍삼의 루트당!',
    markers: [
      {
        id: 1,
        title: '홍삼마커1',
        memo: '홍삼마커내용1',
        location: {
          latitude: 35.29754414695399,
          longitude: 125.5671744126717,
        },
        visiable: false,
        wentDate: '2023-11-02T15:30:00',
        imageUrl: [
          'https://remindmap-bucket.s3.ap-northeast-2.amazonaws.com/marker/1_1700943691429.png',
        ],
      },
      {
        id: 4,
        title: '홍삼마커4',
        memo: '홍삼마커내용4',
        location: {
          latitude: 35.19754414695399,
          longitude: 125.4671744126717,
        },
        visiable: false,
        wentDate: '2023-11-02T15:30:00',
        imageUrl: [
          'https://remindmap-bucket.s3.ap-northeast-2.amazonaws.com/marker/1_1700943691429.png',
        ],
      },
      {
        id: 5,
        title: '홍삼마커3',
        memo: '홍삼마커내용2',
        location: {
          latitude: 35.19754414695399,
          longitude: 125.1671744126717,
        },
        visiable: false,
        wentDate: '2023-11-02T15:30:00',
        imageUrl: [
          'https://remindmap-bucket.s3.ap-northeast-2.amazonaws.com/marker/1_1700943691429.png',
        ],
      },
    ],
  },
];
