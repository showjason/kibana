/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiKeyPadMenuItem,
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalHeaderTitle,
} from '@elastic/eui';
import { ActionType } from '@kbn/actions-plugin/common';
import { ActionTypeRegistryContract } from '@kbn/triggers-actions-ui-plugin/public';
import * as i18n from '../translations';

interface Props {
  actionTypes?: ActionType[];
  actionTypeRegistry: ActionTypeRegistryContract;
  onClose: () => void;
  onSelect: (actionType: ActionType) => void;
}

export const ActionTypeSelectorModal = ({
  actionTypes,
  actionTypeRegistry,
  onClose,
  onSelect,
}: Props) =>
  actionTypes && actionTypes.length > 0 ? (
    <EuiModal onClose={onClose}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>{i18n.INLINE_CONNECTOR_PLACEHOLDER}</EuiModalHeaderTitle>
      </EuiModalHeader>

      <EuiModalBody>
        <EuiFlexGroup>
          {actionTypes.map((actionType: ActionType) => {
            const fullAction = actionTypeRegistry.get(actionType.id);
            return (
              <EuiFlexItem key={actionType.id} grow={false}>
                <EuiKeyPadMenuItem
                  key={actionType.id}
                  isDisabled={!actionType.enabled}
                  label={actionType.name}
                  onClick={() => onSelect(actionType)}
                >
                  <EuiIcon size="xl" type={fullAction.iconClass} />
                </EuiKeyPadMenuItem>
              </EuiFlexItem>
            );
          })}
        </EuiFlexGroup>
      </EuiModalBody>
    </EuiModal>
  ) : null;
