'use client';

import { useMemo, useState } from 'react';
import styles from './theracorp-labs.module.css';

type JourneyStep = {
  id: string;
  title: string;
  short: string;
  description: string;
  appStatus: string;
};

type ResultPanel = {
  id: string;
  label: string;
  value: string;
  status: string;
  note: string;
};

const journeySteps: JourneyStep[] = [
  {
    id: 'pedido',
    title: 'Pedido médico',
    short: '01',
    description: 'O médico define quais painéis fazem sentido para sua fase de cuidado e libera a solicitação no app.',
    appStatus: 'Exames solicitados',
  },
  {
    id: 'coleta',
    title: 'Coleta dos exames',
    short: '02',
    description: 'Você agenda ou realiza a coleta indicada, seguindo as orientações de preparo exibidas antes do exame.',
    appStatus: 'Coleta em andamento',
  },
  {
    id: 'analise',
    title: 'Análise clínica',
    short: '03',
    description: 'Os resultados são organizados por área metabólica e enviados para leitura clínica da equipe Theracorp.',
    appStatus: 'Em análise médica',
  },
  {
    id: 'resultado',
    title: 'Resultado no app',
    short: '04',
    description: 'O app mostra seus biomarcadores, comentários médicos e próximos passos para acompanhamento.',
    appStatus: 'Resultados liberados',
  },
];

const resultPanels: ResultPanel[] = [
  {
    id: 'metabolismo',
    label: 'Metabolismo',
    value: 'Glicose, insulina e HbA1c',
    status: 'Acompanhamento ativo',
    note: 'Indicadores usados para entender energia, controle glicêmico e tendência metabólica.',
  },
  {
    id: 'cardio',
    label: 'Cardiometabólico',
    value: 'LDL, HDL, ApoB e triglicerídeos',
    status: 'Revisão médica',
    note: 'Leitura integrada para risco cardiometabólico e ajustes de plano quando necessário.',
  },
  {
    id: 'hormonios',
    label: 'Hormônios',
    value: 'Testosterona, SHBG e estradiol',
    status: 'Histórico comparativo',
    note: 'Comparação entre coletas para acompanhar resposta clínica com contexto individual.',
  },
];

export function LabsExperience() {
  const [activeStep, setActiveStep] = useState(journeySteps[0].id);
  const [activePanel, setActivePanel] = useState(resultPanels[0].id);

  const selectedStep = useMemo(
    () => journeySteps.find((step) => step.id === activeStep) ?? journeySteps[0],
    [activeStep],
  );

  const selectedPanel = useMemo(
    () => resultPanels.find((panel) => panel.id === activePanel) ?? resultPanels[0],
    [activePanel],
  );

  return (
    <div className={styles.experienceGrid}>
      <div className={styles.phoneShell} aria-label="Prévia interativa do aplicativo Theracorp Labs">
        <div className={styles.phoneStatus}>
          <span>Theracorp</span>
          <span>{selectedStep.appStatus}</span>
        </div>

        <div className={styles.phoneHeader}>
          <p>Saúde metabólica</p>
          <h2>Seus exames em contexto clínico.</h2>
        </div>

        <div className={styles.progressTrack} aria-hidden="true">
          {journeySteps.map((step) => (
            <span key={step.id} className={step.id === activeStep ? styles.progressDotActive : styles.progressDot} />
          ))}
        </div>

        <div className={styles.resultCard}>
          <span>{selectedPanel.label}</span>
          <strong>{selectedPanel.value}</strong>
          <small>{selectedPanel.status}</small>
        </div>

        <div className={styles.doctorNote}>
          <span>Comentário médico</span>
          <p>{selectedPanel.note}</p>
        </div>

        <div className={styles.nextAction}>
          <span>Próximo passo</span>
          <strong>{selectedStep.title}</strong>
        </div>
      </div>

      <div className={styles.controlPanel}>
        <div>
          <h2 className="header-1 text-3xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900 md:text-4xl">
            Da coleta ao plano de ação, sem perder o contexto.
          </h2>
          <p className="content-2 mt-4 text-base leading-7 text-tc-gray-500">
            O Theracorp Labs transforma resultados laboratoriais em uma linha do tempo simples: pedido, preparo,
            coleta, análise médica e liberação no aplicativo.
          </p>
        </div>

        <div className={styles.stepList} aria-label="Etapas da jornada Theracorp Labs">
          {journeySteps.map((step) => (
            <button
              key={step.id}
              type="button"
              className={step.id === activeStep ? styles.stepButtonActive : styles.stepButton}
              onClick={() => setActiveStep(step.id)}
              aria-pressed={step.id === activeStep}
            >
              <span>{step.short}</span>
              <strong>{step.title}</strong>
              <small>{step.description}</small>
            </button>
          ))}
        </div>

        <div className={styles.panelTabs} aria-label="Exemplos de biomarcadores">
          {resultPanels.map((panel) => (
            <button
              key={panel.id}
              type="button"
              className={panel.id === activePanel ? styles.panelTabActive : styles.panelTab}
              onClick={() => setActivePanel(panel.id)}
              aria-pressed={panel.id === activePanel}
            >
              {panel.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
