import React from 'react';
import {
  FiFilePlus,
  FiFolder,
  FiSave,
  FiPrinter,
  FiRotateCcw,
  FiRotateCw,
  FiZoomIn,
  FiZoomOut,
  FiMaximize,
} from 'react-icons/fi';

import { useAppDispatch, useAppSelector } from '../../store';
import { toFitZoomInEditorSpace, zoomIn, zoomOut } from '../../store/Editor';
import { ActionButtom, Container } from './styles';

const ActionsBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const editorZoom = useAppSelector((state) => state.editor.zoom);
  const screenSize = useAppSelector((state) => state.screens.items[0]?.size);

  function handleZoomIn() {
    dispatch(zoomIn());
  }

  function handleZoomOut() {
    dispatch(zoomOut());
  }

  function handleToFitScreen() {
    dispatch(toFitZoomInEditorSpace(screenSize));
  }

  const tools = [
    { name: 'Novo projeto', icon: FiFilePlus, action: () => {} },
    { name: 'Abrir projeto', icon: FiFolder, action: () => {} },
    { name: 'Salvar', icon: FiSave, action: () => {} },
    { name: 'Imprimir', icon: FiPrinter, action: () => {} },
    { name: 'Rotacionar', icon: FiRotateCcw, action: () => {} },
    { name: 'RotacionarCw', icon: FiRotateCw, action: () => {} },
    { name: 'ZoomIn', icon: FiZoomIn, action: handleZoomIn },
    { name: 'ZoomOut', icon: FiZoomOut, action: handleZoomOut },
    { name: 'Enquadrar', icon: FiMaximize, action: handleToFitScreen },
  ];
  return (
    <Container>
      {tools.map((tool) => {
        return (
          <ActionButtom key={tool.name} onClick={() => tool.action()}>
            <tool.icon size={18} />
          </ActionButtom>
        );
      })}
      <h3>{editorZoom}</h3>
    </Container>
  );
};

export default ActionsBar;
