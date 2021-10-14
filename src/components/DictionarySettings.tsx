import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import MoreVert from '@mui/icons-material/MoreVert';

interface DictionarySettingsProps {
  onDelete?: React.MouseEventHandler<HTMLLIElement>,
  onEdit?: React.MouseEventHandler<HTMLLIElement>
}

export const DeictionarySettings: React.FC<DictionarySettingsProps> = ({
  onDelete,
  onEdit
}): JSX.Element => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenSettings = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleCloseSettings = () => setAnchorEl(null);

  const menuItems = [
    { Icon: Edit, text: "Изменить", onClick: onEdit, disabled: true },
    { Icon: Delete, text: "Удалить", onClick: onDelete },
  ]

  return (
    <>
      <IconButton
        aria-label="Настройки"
        onClick={handleOpenSettings}
      >
        <Tooltip title="Настройки">
          <MoreVert />
        </Tooltip>
      </IconButton>
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        onClick={handleCloseSettings}
        onClose={handleCloseSettings}
      >{menuItems.map(({ Icon, text, onClick, ...other }, i) => (
        <MenuItem onClick={onClick} key={`echmi_${i}`} {...other}>
          <ListItemIcon><Icon /></ListItemIcon>
          {text}
        </MenuItem>
      ))}
      </Menu>
    </>
  )
}