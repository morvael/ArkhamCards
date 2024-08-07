import React, { useCallback, useContext, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { t } from 'ttag';

import SetupStepWrapper from '../SetupStepWrapper';
import ScenarioGuideContext from '../ScenarioGuideContext';
import CampaignGuideTextComponent from '../CampaignGuideTextComponent';
import { BorderColor, BulletType } from '@data/scenario/types';
import BinaryResult from '../BinaryResult';
import InputWrapper from './InputWrapper';
import ActionButton from './ActionButton';
import space from '@styles/space';

interface Props {
  id: string;
  bulletType?: BulletType;
  text?: string;
  color?: BorderColor;
}

export default function BinaryPrompt({ id, bulletType, text, color }: Props) {
  const { scenarioState } = useContext(ScenarioGuideContext);
  const yes = useCallback(() => {
    scenarioState.setDecision(id, true);
  }, [id, scenarioState]);

  const no = useCallback(() => {
    scenarioState.setDecision(id, false);
  }, [id, scenarioState]);

  const decision = scenarioState.decision(id);
  const buttons = useMemo(() => {
    return (
      <View style={styles.row}>
        <View style={space.paddingRightXs}>
          <ActionButton title={t`Yes`} leftIcon="check" color="green" onPress={yes} />
        </View>
        <ActionButton title={t`No`} leftIcon="close" color="red" onPress={no} />
      </View>
    );
  }, [yes, no]);
  return decision === undefined ? (
    <InputWrapper buttons={buttons} editable>
      <SetupStepWrapper bulletType={bulletType} color={color}>
        { !!text && <CampaignGuideTextComponent text={text} /> }
      </SetupStepWrapper>
    </InputWrapper>
  ) : (
    <BinaryResult
      bulletType={bulletType}
      prompt={text}
      result={decision}
      color={color}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
