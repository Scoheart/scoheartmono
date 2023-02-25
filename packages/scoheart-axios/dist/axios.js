function u(t) {
  return new Promise((n, o) => {
    let e = new XMLHttpRequest();
    e.open(t.method, t.url), e.send(), e.onreadystatechange = function() {
      e.readyState === 4 && (e.status >= 200 && e.status < 300 ? n(e.response) : o("error"));
    };
  });
}
function l(t) {
  return u(t).then(function(o) {
    return o;
  }, function(o) {
  });
}
function r(t) {
  this.defaults = t, this.interceptor = {
    request: {},
    response: {}
  };
}
r.prototype.request = function(t) {
  let n = Promise.resolve(t), o = [l, void 0];
  return n.then(o[0], o[1]);
};
r.prototype.get = function() {
  console.log("get method");
};
const a = {
  method: "get",
  url: "http://localhost:3000/person",
  data: null
};
function c(t) {
  let n = new r(t), o = r.prototype.request.bind(n);
  return Object.keys(n).forEach((e) => {
    o[e] = n[e];
  }), Object.keys(r.prototype).forEach((e) => {
    o[e] = r.prototype[e];
  }), console.dir(o), o;
}
let s = c(a);
s();
s({
  method: "get",
  url: "http://localhost/get"
}).then((t) => {
  console.log(t);
});
export {
  s as default
};
