import React, { ReactNode, useCallback, useEffect, useState } from "react";

import styled from "@emotion/styled";

import { Button } from "../button";
import { Dropdown } from "../dropdown";
import { Input } from "../input";
import { colors } from "../theme/colors";

type Option = {
  id: number;
  name: string;
};

const ENTRIES: Array<Option> = [
  {
    id: 1,
    name: "10",
  },
  {
    id: 2,
    name: "25",
  },
  {
    id: 3,
    name: "50",
  },
  {
    id: 4,
    name: "100",
  },
];

type BaseObject = {
  id: number;
  [key: string]: unknown;
};

export type ColumnProp<T = BaseObject> = {
  heading: string;
  value: keyof T;
};

type TableProps<T = BaseObject> = {
  columns: Array<ColumnProp<T>>;
  data: Array<T> | undefined;
  isLoading: boolean;
  onSelect: (element: T) => void;
};

export const Table = <T extends BaseObject = BaseObject>({
  columns,
  data,
  isLoading,
  onSelect,
}: TableProps<T>) => {
  const [page, setPage] = useState<number>(1); // Pagina seleccionada.
  const [entriesPerPage, setEntriesPerPage] = useState<number>(1); // Cantidad de entries a mostrar.
  const [totalPage, setTotalPages] = useState<number>(0); // Total de paginas.
  const [content, setContent] = useState<Array<T>>([]); // Entries a mostrar.
  const [showMessage, setShowMessage] = useState<string>("");
  const [filter, setFilter] = useState("");

  const tableStatus = useCallback(
    (data: Array<T>) => {
      const perPageSelected =
        ENTRIES.find((e) => e.id === entriesPerPage) || ENTRIES[0];

      let start = 0;
      let end = 0;

      if (perPageSelected?.name) {
        start = (page - 1) * parseInt(perPageSelected?.name);
        end = page * parseInt(perPageSelected?.name);
      }

      const c = data.slice(start, end);
      const f = data.findIndex((d) => d.id === c[0].id);
      const l = data.findIndex((d) => d.id === c[c.length - 1].id);

      const message = `Showing ${f + 1} to ${l + 1} of ${data.length}`;

      setTotalPages(Math.ceil(data.length / parseInt(perPageSelected?.name)));
      setShowMessage(message);
      setContent(c);
    },
    [entriesPerPage, page]
  );

  useEffect(() => {
    if (data !== undefined && data.length > 0 && filter === "") {
      tableStatus(data);
    }
  }, [data, filter, tableStatus]);

  useEffect(() => {
    if (data !== undefined && data.length > 0 && filter !== "") {
      const listEntries: Array<T> = [];

      data.forEach((d, index) => {
        Object.values(d).forEach((v) => {
          if (
            typeof v === "string" &&
            v.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
          ) {
            const exist = listEntries.some((s) => s.id === data[index].id);
            if (!exist) {
              listEntries.push(data[index]);
            }
          }
        });
      });

      tableStatus(listEntries);
    }
  }, [filter, data, tableStatus]);

  const prevPage = () => setPage((prevState) => prevState - 1);
  const nextPage = () => setPage((prevState) => prevState + 1);

  return (
    <React.Fragment>
      <Header>
        <Dropdown
          name="entries"
          label="Entries"
          options={ENTRIES}
          onChange={setEntriesPerPage as (value: number | number[]) => void}
          value={entriesPerPage}
        />
        <Input
          label="Search"
          name="search"
          onChange={setFilter}
          placeholder="Enter your value here"
        />
      </Header>
      <TableContainer>
        <Thead>
          <tr>
            {columns.map((c) => (
              <Th key={c.heading.toLocaleLowerCase()}>{c.heading}</Th>
            ))}
          </tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <Tr>
              <Td colSpan={columns.length}>Loading...</Td>
            </Tr>
          ) : content.length > 0 ? (
            content.map((d) => (
              <Tr key={`tr-${d.id}`}>
                {columns.map((c) => (
                  <Td
                    key={`td-${d.id}-${c.heading}`}
                    onClick={() => onSelect(d)}
                  >
                    {d[c.value] as ReactNode}
                  </Td>
                ))}
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={columns.length}>No data available in table.</Td>
            </Tr>
          )}
        </Tbody>
      </TableContainer>
      <Pagination>
        <Show>
          <span>{showMessage}</span>
        </Show>
        <Navigation>
          <Button
            text="Previous"
            variant="primary"
            onClick={prevPage}
            disabled={page === 1}
          />
          <Button
            text="Next"
            variant="primary"
            onClick={nextPage}
            disabled={page === totalPage}
          />
        </Navigation>
      </Pagination>
    </React.Fragment>
  );
};

const Header = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "1rem",
});

const TableContainer = styled.table({
  border: `1px solid ${colors.Black}`,
  borderCollapse: "collapse",
  width: "100%",
  marginTop: "1rem",
});

const Thead = styled.thead({
  "& th": {
    fontWeight: "bold",
    verticalAlign: "top",
    padding: "5px",
  },
});

const Tbody = styled.thead({
  "& th": {
    verticalAlign: "top",
    padding: "5px",
  },
});

const Th = styled.th({
  border: `1px solid ${colors.Black}`,
  borderCollapse: "collapse",
});

const Td = styled.td({
  border: `1px solid ${colors.Black}`,
  borderCollapse: "collapse",
  textAlign: "center",
  padding: "0.2rem",
});

const Tr = styled.tr({
  "&:hover": {
    backgroundColor: colors.DenimBlue,
  },
});

const Pagination = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  borderLeft: `1px solid ${colors.Black}`,
  borderBottom: `1px solid ${colors.Black}`,
  borderRight: `1px solid ${colors.Black}`,
  padding: "1rem",
});

const Show = styled.div({
  display: "flex",
  alignItems: "center",
});

const Navigation = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  gap: "1rem",
});
