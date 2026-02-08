import { useState } from 'react';

import { CheckboxIcon, CloseIcon, EditIcon } from '@/assets';
import { STATUS_OPTIONS } from '@/shared/constants/status-options';
import { Select } from '@/shared/components/select';
import StatusDot from '@/shared/components/status-dot';
import { TextField } from '@/shared/components/text-field';
import { cn } from '@/shared/lib/cn/cn';

import type { CharacterCardData, CharacterStatus } from './types';

import './character-card.scss';

interface CharacterCardWidgetProps {
  data: CharacterCardData;
  onSave?: (payload: { id: string; name: string; status: CharacterStatus }) => Promise<void> | void;
}

export const CharacterCardWidget = (props: CharacterCardWidgetProps) => {
  const { data, onSave } = props;

  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [editName, setEditName] = useState(data.name);
  const [editStatus, setEditStatus] = useState<CharacterStatus>(data.status);

  const handleEdit = () => {
    setEditName(data.name);
    setEditStatus(data.status);
    setMode('edit');
  };

  const handleCancel = () => {
    setEditName(data.name);
    setEditStatus(data.status);
    setMode('view');
  };

  const handleSave = async () => {
    const trimmedName = editName.trim();
    const hasChanges = trimmedName !== data.name || editStatus !== data.status;
    if (!trimmedName || !hasChanges) return;

    if (onSave) {
      await onSave({ id: data.id, name: trimmedName, status: editStatus });
    }
    setMode('view');
  };

  const hasChanges = editName.trim() !== data.name || editStatus !== data.status;
  const canSave = editName.trim() !== '' && hasChanges;

  return (
    <div className={cn('character-card', { 'character-card--edit': mode === 'edit' })}>
      <div className='character-card__image'>
        <img src={data.image} alt={data.name} />
      </div>

      <div className='character-card__content'>
        {mode === 'view' ? (
          <>
            <button
              type='button'
              className='character-card__edit-btn'
              onClick={handleEdit}
              aria-label='Edit character'
            >
              <EditIcon />
            </button>

            <div className='character-card__name'>
              <span>{data.name}</span>
            </div>

            <div className='character-card__field'>
              <span className='character-card__field-label'>Gender:</span>
              <span className='character-card__field-value'>{data.gender}</span>
            </div>

            <div className='character-card__field'>
              <span className='character-card__field-label'>Species:</span>
              <span className='character-card__field-value'>{data.species}</span>
            </div>

            <div className='character-card__field'>
              <span className='character-card__field-label'>Location:</span>
              <span className='character-card__field-value'>{data.location}</span>
            </div>

            <div className='character-card__field'>
              <span className='character-card__field-label'>Status:</span>
              <div className='character-card__field-value character-card__field-value--with-dot'>
                <StatusDot variant={data.status} />
                <span>{data.status}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='character-card__edit-field'>
              <TextField
                variant='underlined'
                value={editName}
                onChange={setEditName}
                onClear={() => setEditName('')}
                autoFocus
              />
              <div className='character-card__actions'>
                <button
                  type='button'
                  className='character-card__action-btn character-card__action-btn--cancel'
                  onClick={handleCancel}
                  aria-label='Cancel editing'
                >
                  <CloseIcon />
                </button>
                <button
                  type='button'
                  className='character-card__action-btn character-card__action-btn--save'
                  onClick={handleSave}
                  disabled={!canSave}
                  aria-label='Save changes'
                >
                  <CheckboxIcon />
                </button>
              </div>
            </div>

            <div className='character-card__field'>
              <span className='character-card__field-label'>Gender:</span>
              <span className='character-card__field-value'>{data.gender}</span>
            </div>

            <div className='character-card__field'>
              <span className='character-card__field-label'>Species:</span>
              <span className='character-card__field-value'>{data.species}</span>
            </div>

            <div className='character-card__field'>
              <span className='character-card__field-label'>Location:</span>
              <span className='character-card__field-value'>{data.location}</span>
            </div>

            <div className='character-card__field character-card__field--status'>
              <span className='character-card__field-label'>Status:</span>
              <Select
                size='sm'
                options={STATUS_OPTIONS}
                value={editStatus}
                onChange={setEditStatus}
                addon={<StatusDot variant={editStatus} />}
                renderOptionAddon={(value) => <StatusDot variant={value} />}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

