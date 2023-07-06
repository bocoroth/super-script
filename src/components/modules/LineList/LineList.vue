<script lang="ts">
// The LineList module displays the datatable containing the current script.

import DataTable from 'datatables.net-vue3'
import DataTablesLib from 'datatables.net'
import DataTablesCore from 'datatables.net-bs5'
import Responsive from 'datatables.net-responsive-bs5'
import Scroller from 'datatables.net-scroller-bs5'
import Select from 'datatables.net-select-bs5'
import { Util } from '../../Util'

DataTable.use(DataTablesLib)
DataTable.use(DataTablesCore)
DataTable.use(Responsive)
DataTable.use(Scroller)
DataTable.use(Select)

export default {
  name: 'LineList',
  components: { DataTable },
  data() {
    return {
      dtColumns: [
        {
          data: 'id',
          name: 'id',
          responsivePriority: 2
        },
        {
          data: 'startTime',
          name: 'startTime',
          responsivePriority: 5
        },
        {
          data: 'endTime',
          name: 'endTime',
          responsivePriority: 6
        },
        {
          data: 'durationMS',
          name: 'durationMS',
          responsivePriority: 4
        },
        {
          data: 'cssClass',
          name: 'cssClass',
          responsivePriority: 3
        },
        {
          data: 'text',
          name: 'text',
          width: '100%',
          responsivePriority: 1
        }
      ],
      dtOptions: {
        dom: "<'row'<'col-sm-12 col-md-6 gotoLine'><'col-sm-12 col-md-6'f>>" + "<'row'<'dttable col-sm-12'tr>>",
        language: {
          search: this.$t('LineList.search')
        },
        paging: false,
        responsive: true,
        scrollY: '70vh',
        select: 'single'
      },
      dtData: [
        {
          id: 1,
          startTime: '00:00:00.000',
          endTime: '00:00:05.000',
          durationMS: 5000,
          cssClass: 'default',
          text: 'This is a test line.'
        },
        {
          id: 2,
          startTime: '00:00:05.000',
          endTime: '00:00:10.000',
          durationMS: 5000,
          cssClass: 'default',
          text: 'This is a second test line.'
        },
        {
          id: 3,
          startTime: '00:00:10.000',
          endTime: '00:00:15.000',
          durationMS: 5000,
          cssClass: 'default',
          text: 'This is the last test line.'
        }
      ]
    }
  },
  mounted() {
    // Add Go To Line input field and buttons to DataTable top area DOM
    const gotoLine = document.getElementById('gotoLineContainer')
    /* c8 ignore start */
    if (gotoLine) {
      document.querySelector('.gotoLine')?.append(gotoLine)
      gotoLine.removeAttribute('style')
    }
    /* c8 ignore stop */

    Util.debugLog('LineList module mounted.')
  }
}
</script>

<template>
  <dataTable
    id="linelist"
    ref="table"
    :columns="dtColumns"
    :data="dtData"
    :options="dtOptions"
    class="table table-striped"
  >
    <thead>
      <tr>
        <th>{{ $t('LineList.number') }}</th>
        <th>{{ $t('LineList.start') }}</th>
        <th>{{ $t('LineList.end') }}</th>
        <th>{{ $t('LineList.length') }}</th>
        <th>{{ $t('LineList.class') }}</th>
        <th>{{ $t('LineList.line') }}</th>
      </tr>
    </thead>
  </dataTable>

  <div id="gotoLineContainer" style="display: none">
    <label id="gotoLineLabel">{{ $t('LineList.gotoline') }}</label>
    <input id="gotoLineInput" type="text" />
    <button id="gotoLineView" class="btn btn-sm btn-info">{{ $t('LineList.view') }}</button>
    <button id="gotoLineCue" class="btn btn-sm btn-warning">{{ $t('LineList.cue') }}</button>
    <button id="gotoLineGo" class="btn btn-sm btn-danger">{{ $t('LineList.go') }}</button>
  </div>
</template>

<style lang="scss">
@import 'bootstrap';
@import 'datatables.net-bs5';
@import 'datatables.net-responsive-bs5';
@import 'datatables.net-scroller-bs5';
@import 'datatables.net-select-bs5';

// prevent horizontal scroll bars
.row {
  margin-left: 0;
  margin-right: 0;

  .dttable {
    padding-left: 0;
    padding-right: 0;
  }
}

#gotoLineContainer {
  #gotoLineInput {
    width: 75px;
    margin-left: 10px;
  }
  .btn {
    margin-left: 20px;
    margin-top: -5px;
  }
}

div.datatable {
  margin-top: 6px;
}

table.dataTable {
  tr {
    line-height: 0.75;
  }

  thead > tr > th {
    background-color: #222f3e;
    box-shadow: none;
    font-size: 12px;
  }
}
</style>
