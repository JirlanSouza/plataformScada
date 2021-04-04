import React from 'react';
import { FiMousePointer, FiType, FiCircle, FiSquare, FiBarChart, FiTriangle, FiTrendingUp } from 'react-icons/fi';

import { Container } from './styles';

const ToolBar: React.FC = () => {
  const tools = [
    {name: 'Cursor', icon: FiMousePointer },
    {name: 'Text', icon: FiType },
    {name: 'Circle', icon: FiCircle },
    {name: 'Square', icon: FiSquare },
    {name: 'Triangle', icon: FiTriangle},
    {name: 'BarGraf', icon: FiBarChart },
    {name: 'Trending', icon: FiTrendingUp },
  ]
  return (
    <Container>
      {tools.map((tool) => {
        return (
          <li key={tool.name}>
            <tool.icon size={18} />
          </li>
        )
      })}      
    </Container>
  );
}

export default ToolBar;