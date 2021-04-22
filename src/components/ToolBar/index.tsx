import React from 'react';
import { IconType } from 'react-icons';
import {
  FiMousePointer,
  FiType,
  FiCircle,
  FiSquare,
  FiBluetooth,
  FiBarChart,
  FiTriangle,
  FiTrendingUp
} from 'react-icons/fi';
import { useEditorContext } from '../../contexts';
import { ObjectsTypes } from '../../projectObjects';

import { Container } from './styles';

interface Tool {
  name: ObjectsTypes,
  icon: IconType
}
const ToolBar: React.FC = () => {
  const tools: Tool[] = [
    {name: 'Cursor', icon: FiMousePointer },
//  {name: 'Text', icon: FiType },
    {name: 'Circle', icon: FiCircle },
    {name: 'Rectangle', icon: FiSquare },
    {name: 'Triangle', icon: FiTriangle},
    {name: 'Button', icon: FiBluetooth},
    {name: 'BarGraph', icon: FiBarChart },
//  {name: 'Trending', icon: FiTrendingUp },
  ];

  const { setToolSelected } = useEditorContext();

  function handleSelectTool (tool: ObjectsTypes) {
    setToolSelected(tool);
  }

  return (
    <Container>
      {tools.map((tool) => {
        return (
          <li key={tool.name} onClick={() => handleSelectTool(tool.name)}>
            <tool.icon size={18} />
          </li>
        )
      })}      
    </Container>
  );
}

export default ToolBar;