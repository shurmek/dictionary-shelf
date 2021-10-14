import React, { useState } from "react";
import MuiToolbar from '@mui/material/Toolbar';
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from "./Search";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import ViewModule from "@mui/icons-material/ViewModule";
import ViewList from "@mui/icons-material/ViewList";

export type ViewControlValues = "list" | "module";

export interface ToolbarProps {
  viewControl: {
    value: ViewControlValues,
    onChange: (e: React.MouseEvent<HTMLElement>, value: ViewControlValues) => any
  },
  searchControl: {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => any
  } 
};


export const Toolbar: React.FC<ToolbarProps> = ({
  viewControl,
  searchControl
}): JSX.Element => (
  <MuiToolbar sx={{ justifyContent: "flex-end" }}>
    <Search>
      <SearchIconWrapper>
        <SearchIcon color="primary" />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Поиск..."
        value={searchControl.value}
        onChange={searchControl.onChange}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
    <ToggleButtonGroup
      color="primary"
      aria-label="Переключить вид"
      size="small"
      sx={{ ml: 2 }}
      exclusive
      {...viewControl}
    >
      <ToggleButton value="list" aria-label="Отображать в виде списка">
        <Tooltip title="Отображать в виде строк">
          <ViewList />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="module" aria-label="Отображать в виде карточек">
        <Tooltip title="Отображать в виде карточек">
          <ViewModule />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  </MuiToolbar>
)