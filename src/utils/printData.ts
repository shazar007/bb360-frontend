import dayjs from "dayjs";

export const printData = {
  adjustmentByItem: [
    {
      title: "Basic Info",
      type: "info",

      fields: [
        {
          label: "Transaction Number",
          key: "transactionNumber",
        },

        {
          label: "Date",
          render: (item: any) =>
            item?.transactionDate
              ? new Date(item.transactionDate).toLocaleDateString()
              : "-",
        },

        {
          label: "Created From",
          key: "createdFrom",
        },

        {
          label: "Transaction Name",
          key: "transactionName",
        },

        {
          label: "Status",
          key: "status",
        },

        {
          label: "Notes",
          key: "notes",
        },

        {
          label: "Created By",
          render: (item: any) => item?.createdBy?.name || "-",
        },
      ],
    },

    // ITEMS TABLE
    {
      title: "Items",
      type: "table",

      columns: [
        {
          label: "Item Code",
          render: (row: any) => row?.item?.itemCode || "-",
        },

        {
          label: "Item Name",
          render: (row: any) => row?.item?.itemName || "-",
        },

        {
          label: "UOM",
          render: (row: any) => row?.item?.uom || "-",
        },
      ],

      data: (item: any) => item?.items || [],
    },

    // BATCHES TABLE
    {
      title: "Batches",
      type: "table",

      columns: [
        {
          label: "Batch Number",
          key: "batchNumber",
        },

        {
          label: "Balance",
          key: "balance",
        },

        {
          label: "Adjusted Quantity",
          key: "adjustedQuantity",
        },
      ],

      data: (item: any) =>
        (item?.items || []).flatMap((i: any) => i?.batches || []),
    },
  ],

  adjustmentByAll: [
    {
      label: "Transaction Number",
      key: "transactionNumber",
    },
    {
      label: "Item Name",
      render: (row: any) =>
        row?.items?.map((i: any) => i?.item?.itemName).join(", ") || "-",
    },

    {
      label: "Date",
      render: (row: any) => dayjs(row.transactionDate).format("DD-MMM-YYYY"),
    },
    {
      label: "Created From",
      key: "createdFrom",
    },
    {
      label: "Status",
      key: "status",
    },
  ],

  stockTakingByAll: [
    {
      title: "",
      type: "info",

      fields: [
        {
          label: "From Date",
          key: "fromDate",
        },
        {
          label: "To Date",
          key: "toDate",
        },
      ],
    },
    {
      type: "table",
      columns: [
        {
          label: "Item Code",
          key: "itemCode",
        },
        {
          label: "Item Name",
          key: "itemName",
        },

        {
          label: "Total Batches",
          key: "totalBatches",
        },
        {
          label: "Item Category",
          key: "itemCategory",
        },
        {
          label: "UOM",
          key: "uom",
        },
        {
          label: "Opening Balance",
          render: (row: any) => row?.totals?.opening || "0",
        },
        {
          label: "Purchase",
          render: (row: any) => row?.totals?.purchase || "0",
        },
        {
          label: "Adjustment",
          render: (row: any) => row?.totals?.adjustment || "0",
        },
        {
          label: "Sale",
          render: (row: any) => row?.totals?.sale || "0",
        },
        {
          label: "Closing Stock",
          render: (row: any) => row?.totals?.closing || "0",
        },
        {
          label: "Actual Stock",
          render: (row: any) => row?.totals?.actual || "0",
        },
      ],
      data: (item: any) => item?.items || [],
    },
  ],

  stockTakingByItem: [
    {
      title: "",
      type: "info",

      fields: [
        {
          label: "From Date",
          key: "fromDate",
        },
        {
          label: "To Date",
          key: "toDate",
        },

        // {
        //   label: "Notes",
        //   key: "notes",
        // },
      ],
    },

    // ITEMS TABLE
    {
      title: "Item",
      type: "table",

      columns: [
        {
          label: "Item Code",
          key: "itemCode",
        },
        {
          label: "Item Name",
          key: "itemName",
        },
        {
          label: "Item Category",
          key: "itemCategory",
        },

        {
          label: "UOM",
          key: "uom",
        },
        {
          label: "Total Batches",
          key: "totalBatches",
        },
      ],

      data: (item: any) => [item],
    },

    // BATCHES TABLE
    {
      title: "Batches",
      type: "table",

      columns: [
        {
          label: "Batch Number",
          key: "batchNumber",
        },

        {
          label: "Opening Balance",
          key: "opening",
        },
        {
          label: "Purchase",
          key: "purchase",
        },

        {
          label: "Adjusted Quantity",
          key: "adjustment",
        },
        {
          label: "Sale",
          key: "sale",
        },

        {
          label: "Closing Stock",
          key: "closing",
        },
        {
          label: "Actual Stock",
          key: "actualStock",
        },
      ],

      data: (item: any) => item?.batches || [],
    },
  ],
};
