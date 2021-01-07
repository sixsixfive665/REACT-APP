import Exception404 from 'views/Exception/Exception404'
import Index from 'views/Index/Index'
import Father from 'views/Father/Father'
import ChildOne from 'views/ChildOne/ChildOne'
import ChildTwo from 'views/ChildTwo/ChildTwo'
import GrandOne from 'views/GrandOne/GrandOne'
import GrandTwo from 'views/GrandTwo/GrandTwo'
import About from 'views/About/About'
import TableList from 'views/TableList/TableList'
import Demo from 'views/Demo/Demo';

export default function componentMap(route) {
  switch (route.component) {
    case 'Index':
      route.component = Index
      break;
    case 'Father':
      route.component = Father
      break;
    case 'ChildOne':
      route.component = ChildOne
      break;
    case 'ChildTwo':
      route.component = ChildTwo
      break;
    case 'GrandOne':
      route.component = GrandOne
      break;
    case 'GrandTwo':
      route.component = GrandTwo
      break;
    case 'About':
      route.component = About
      break;
    case 'TableList':
      route.component = TableList
      break;
    case 'Demo':
      route.component = Demo
      break;
    default:
      route.component = Exception404
      break;
  }
}