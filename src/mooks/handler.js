import { rest } from 'msw';
import { groups } from './groups';
import { groupMembers } from './groupMembers';
import { friends } from './friends';
import { groupMarkers } from './groupMarkers';

const groupIdCreate = groupId => {
  return groupId + 1;
};

export const handlers = [
  // 할일 목록

  rest.post('/group/create', (req, res, ctx) => {
    const lastGroupIndex = groups.length - 1;
    const title = req.body.title;
    const groupId = groupIdCreate(groups[lastGroupIndex].groupId);
    const group = { groupId: groupId, title: title };
    groups.push(group);
    return res(ctx.status(200), ctx.json({ groupId }));
  }),
  rest.post(`/group/edit/:groupId`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get('/group/get/:groupId', (req, res, ctx) => {
    const { groupId } = req.params;
    let group = groups.find(el => el.groupId === groupId);

    if (group) {
      return res(ctx.status(200), ctx.json(group));
    } else {
      // 그룹을 찾지 못한 경우에 대한 처리
      return res(ctx.status(404), ctx.json({ error: 'Group not found' }));
    }
  }),
  rest.get('/group/getall', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(groups));
  }),
  rest.post('/group/member/add', (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.delete('/group/member/remove/:groupMemberId', (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get('/group/member/get/:groupId', (req, res, ctx) => {
    const { groupId } = req.params;
    const arr = [];
    groupMembers.forEach(el => {
      if (el.groupId === groupId) {
        arr.push(el);
      }
    });
    return res(ctx.status(200), ctx.json(arr));
  }),
  rest.get('/group/friends', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(friends));
  }),
  rest.get('/marker/group/:groupId', (req, res, ctx) => {
    const { groupId } = req.params;
    console.log(groupId);
    return res(ctx.status(200), ctx.json(groupMarkers));
  }),
];
