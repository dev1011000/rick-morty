import { memo, useState } from 'react';
import { Link } from 'react-router-dom';

import { CheckboxIcon, CloseIcon, EditIcon } from '@/assets';
import { Select, StatusDot, TextField } from '@/shared/components';
import { STATUS_OPTIONS } from '@/shared/constants';
import { cn } from '@/shared/lib';

import type { CharacterCardData, CharacterCardMode, CharacterStatus } from './types';

import './character-card.scss';

interface CharacterCardWidgetProps {
  data: CharacterCardData;
  onSave?: (payload: { id: number; name: string; status: CharacterStatus; location: string }) => Promise<void> | void;
}

export const CharacterCardWidget = memo((props: CharacterCardWidgetProps) => {
  const { data, onSave } = props;

  const [mode, setMode] = useState<CharacterCardMode>('view');
  const [editName, setEditName] = useState(data.name);
  const [editStatus, setEditStatus] = useState<CharacterStatus>(data.status);
  const [editLocation, setEditLocation] = useState(data.location);

  const handleEdit = () => {
    setEditName(data.name);
    setEditStatus(data.status);
    setEditLocation(data.location);
    setMode('edit');
  };

  const handleCancel = () => {
    setEditName(data.name);
    setEditStatus(data.status);
    setEditLocation(data.location);
    setMode('view');
  };

  const trimmedName = editName.trim();
  const trimmedLocation = editLocation.trim();
  const hasChanges = trimmedName !== data.name || editStatus !== data.status || trimmedLocation !== data.location;
  const canSave = trimmedName !== '' && trimmedLocation !== '' && hasChanges;

  const handleSave = async () => {
    if (!trimmedName || !trimmedLocation || !hasChanges) return;

    if (onSave) {
      await onSave({ id: data.id, name: trimmedName, status: editStatus, location: trimmedLocation });
    }
    setMode('view');
  };

  return (
    <div className={cn('character-card', { 'character-card--edit': mode === 'edit' })}>
      <div className='character-card__image'>
        <img src={data.image} alt={data.name} loading='lazy' />
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

            <Link
              to={`/character/${data.id}`}
              className='character-card__name'
            >
              {data.name}
            </Link>

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

            <div className='character-card__edit-field'>
              <TextField
                variant='underlined'
                value={editName}
                onChange={setEditName}
                onClear={() => setEditName('')}
                autoFocus
              />
            </div>

            <div className='character-card__field'>
              <span className='character-card__field-label'>Gender:</span>
              <span className='character-card__field-value'>{data.gender}</span>
            </div>

            <div className='character-card__field'>
              <span className='character-card__field-label'>Species:</span>
              <span className='character-card__field-value'>{data.species}</span>
            </div>

            <div className='character-card__field character-card__field--location'>
              <span className='character-card__field-label'>Location:</span>
              <TextField
                variant='underlined'
                size='sm'
                value={editLocation}
                onChange={setEditLocation}
                onClear={() => setEditLocation('')}
              />
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
});
