import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Appbar } from "../components/Appbar";
import { DictionaryRow } from "../components/DictionaryRow";
import { Toolbar, ViewControlValues } from "../components/Toolbar";
import { useThunks } from "../hooks/thunks.hook";
import { useTypedSelector } from "../hooks/typed-selector.hook";
import { Page } from "../components/Page";
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import Grid from "@mui/material/Grid";
import { DictionaryCard } from "../components/DictionaryCard";
import { FloatingAddForm } from '../components/FloatingAddForm';

export const DictionaryPage: React.FC = (): JSX.Element => {
  const { dictionary } = useTypedSelector(store => store);
  const { dictionaryFetchThunk } = useThunks();
  const [viewType, setViewType] = useState<ViewControlValues>("list");
  const [searchText, setSearchText] = useState<string>("");

  useEffect(()=> {
    searchText.trim() === "" && dictionaryFetchThunk(searchText, true)
  }, [searchText])

  useEffect(() => {
    !!searchText.trim() && dictionaryFetchThunk(searchText, true)
  }, [searchText]);

  return (
    <Page>
      <Appbar />
      <Container>
        <Toolbar
          viewControl={{ value: viewType, onChange: (e, value) => setViewType(value) }}
          searchControl={{ value: searchText, onChange: (e) => setSearchText(e.target.value) }}
        />
      </Container>
      <Container sx={{ flexGrow: 1, position: "relative" }}>
        {viewType === "list" ? (
          <Virtuoso
            data={dictionary.data}
            overscan={dictionary.limit}
            endReached={() => dictionaryFetchThunk(searchText)}
            itemContent={(index, item) => (
              <DictionaryRow key={item.id} dictionary={item} />
            )}
          />
        ) : (
          <VirtuosoGrid
            totalCount={dictionary.data.length}
            overscan={dictionary.limit}
            endReached={() => dictionaryFetchThunk(searchText)}
            components={{
              List: React.forwardRef((props, ref) => <Grid {...props} ref={ref} container spacing={4} />),
              Item: (props) => <Grid {...props} item />
            }}
            itemContent={(index) => (
              <DictionaryCard key={dictionary.data[index].id} dictionary={dictionary.data[index]} />
            )}
          />
        )}
        <FloatingAddForm
          sx={{ position: "absolute", bottom: 32, right: 32 }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        />
      </Container>
    </Page>
  )
}