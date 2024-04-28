//SEND RESPONSE FOR LIST
const jsonAll = function <Res>(
    res: any,
    status: number,
    data: Res | Array<Res>,
    meta: Object = {}
): Res {
    return res.status(status).send({
      data: data,
      meta: {
        ...meta,
      },
    });
};

const jsonOne = function <Res>(res: any, status: number, data: Res): Res {
    return res.status(status).send({
        data,
    });
};
export { jsonAll, jsonOne };