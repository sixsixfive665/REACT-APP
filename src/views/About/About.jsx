import React, { useState } from 'react';
import { Tree } from 'antd';
import './About.scss'

const initTreeDate = [
  {
    title: 'Expand to load',
    key: '0',
  },
  {
    title: 'Expand to load',
    key: '1',
  },
  {
    title: 'Tree Node',
    key: '2',
    isLeaf: true,
  },
];

function updateTreeData(list, key, children) {
  return list.map((node) => {
    if (node.key === key) {
      return { ...node, children };
    } else if (node.children) {
      return { ...node, children: updateTreeData(node.children, key, children) };
    }

    return node;
  });
}

const About = () => {
  const [treeData, setTreeData] = useState(initTreeDate);

  function onLoadData({ key, children }) {
    return new Promise((resolve) => {
      if (children) {
        resolve();
        return;
      }

      setTimeout(() => {
        setTreeData((origin) =>
          updateTreeData(origin, key, [
            {
              title: 'Child Node',
              key: `${key}-0`,
            },
            {
              title: 'Child Node',
              key: `${key}-1`,
            },
          ]),
        );
        resolve();
      }, 1000);
    });
  }
  return (
    <div className="about_container">
      <div className="tree_container">
        <Tree loadData={onLoadData} treeData={treeData} showLine="true" />
      </div>
      <div className="content_container">
        Here is content!
      </div>
    </div>
  )
};

export default About;