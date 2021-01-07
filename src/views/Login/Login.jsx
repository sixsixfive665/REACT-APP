import React, { useEffect, useRef } from 'react';
import { Form, Button, Input } from 'antd'
import './Login.scss'
import store from 'store/index'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from 'api/mock'
import Lockr from 'lockr/index'

const Login = (props) => {
  const drawTimer = useRef();
  function onFinish(values) {
    // console.log('Success:', values);
    store.dispatch({
      type: 'UpdateConfig',
      payload: {
        isLoading: true
      }
    })
    login({ username: values.username, password: values.password }).then(res => {
      if (res.code === 0) {
        const resData = res.data
        Lockr.set('token', resData.token)
        Lockr.set('user', resData)
        store.dispatch({
          type: 'UpdateUser',
          payload: {
            ...resData
          }
        })
        props.history.push({ pathname: '/index' })
        setTimeout(() => {
          store.dispatch({
            type: 'UpdateConfig',
            payload: {
              isLoading: false
            }
          })
        }, 500)
      }
    })
  }
  function initCanvasAnimation() {
    //获取canvas元素,并给canvas设置大小
    var can = document.querySelector("canvas");
    can.width = window.innerWidth;
    can.height = window.innerHeight;
    //canvas大小随浏览器一起变化
    window.onresize = function () {
      can.width = window.innerWidth;
      can.height = window.innerHeight;
    };
    //获取2D绘图环境
    var ctx = can.getContext("2d");
    //返回一个min和max之间的一个随机整数
    function randow(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }
    //返回一个min和max之间的一个随机小数
    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    //用来存放每个圆的属性
    var dots = [];
    //生成圆的个数
    var arcNum = 150;
    // 存储n个不同属性的圆
    function createArc() {
      for (var i = 0; i < arcNum; i++) {
        //定义一个对象，将圆的属性存储起来
        var arcObj = {
          arcX: randow(0, window.innerWidth), //圆的X坐标
          arcY: randow(0, window.innerHeight), //圆的Y坐标
          arcR: 2, //圆的半径
          color: `rgba(${randow(175, 255)},${randow(175, 255)},${randow(
            175,
            255
          )},${random(0, 1)})`,
          suduX: random(-0.15, 0.15), //圆X轴速度
          suduY: random(-0.15, 0.15) //圆Y轴速度
        };
        dots.push(arcObj);
      }
    }
    createArc();
    // 画圆
    function draw() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (var i = 0; i < arcNum; i++) {
        //让圆动起来
        dots[i].arcX += dots[i].suduX;
        dots[i].arcY += dots[i].suduY;
        ctx.beginPath();
        ctx.fillStyle = dots[i].color;
        ctx.arc(dots[i].arcX, dots[i].arcY, dots[i].arcR, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        //边界检测,将速度取反,实现碰撞
        if (dots[i].arcX <= 0 || dots[i].arcX > window.innerWidth)
          dots[i].suduX *= -1;

        if (dots[i].arcY <= 0 || dots[i].arcY > window.innerHeight)
          dots[i].suduY *= -1;

        //利用勾股定理判断是否连线 a*a+b*b=c*c
        //  Math.sqrt() 平方根
        //  Math.pow(a,b)  a的b次方
        for (var j = i + 1; j < arcNum; j++) {
          if (
            Math.sqrt(
              Math.pow(dots[i].arcX - dots[j].arcX, 2) +
              Math.pow(dots[i].arcY - dots[j].arcY, 2)
            ) < 100
          ) {
            ctx.beginPath();
            ctx.strokeStyle = dots[i].color;
            ctx.moveTo(dots[i].arcX, dots[i].arcY);
            ctx.lineTo(dots[j].arcX, dots[j].arcY);
            ctx.closePath();
            ctx.stroke();
          }
        }
      }
    }
    if (drawTimer.current) {
      clearInterval(drawTimer.current)
    }
    if (ctx) {
      drawTimer.current = setInterval(draw, 60 / 1000);
    }
    //添加鼠标移动事件
    can.onmousemove = function (e) {
      var ev = e;
      var mouseX = ev.offsetX;
      var mouseY = ev.offsetY;
      for (var i = 0; i < arcNum; i++) {
        if (
          Math.sqrt(
            Math.pow(dots[i].arcX - mouseX, 2) +
            Math.pow(dots[i].arcY - mouseY, 2)
          ) < 100
        ) {
          ctx.beginPath();
          ctx.strokeStyle = dots[i].color;
          ctx.moveTo(mouseX, mouseY);
          ctx.lineTo(dots[i].arcX, dots[i].arcY);
          ctx.closePath();
          ctx.stroke();
        }
      }
    };
  }
  /* eslint-disable */
  useEffect(() => {
    setTimeout(() => {
      initCanvasAnimation()
    }, 0);
    return () => {
      clearInterval(drawTimer.current)
    }
  }, [])
  /* eslint-disable */
  return (
    <div>
      <div className="login">
        <canvas className="circle_line_canvas"></canvas>
      </div >
      <div className="info_area">
        <div className="title">Ant Design React Admin</div>
        <div className="login_type">账号密码登录</div>
        <br />
        <Form
          className="login_form"
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          name="login"
          onFinish={onFinish}
          initialValues={
            {
              username: 'admin',
              password: '123456'
            }
          }
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '账号不能为空！' }]}
          >
            <Input className="user_name" prefix={<UserOutlined />} placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '密码不能为空！' }]}
          >
            <Input.Password className="password" prefix={<LockOutlined />} placeholder="请输入密码" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <Button className="submit_btn" type="primary" htmlType="submit">
              登录
              </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;