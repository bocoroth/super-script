<script lang="ts">
// The LineList module displays the datatable containing the current script.

import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import Responsive from 'datatables.net-responsive-bs5'
import Scroller from 'datatables.net-scroller-bs5'
import Select from 'datatables.net-select-bs5'
import { Util } from '../../Util'

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
          width: '2vw',
          responsivePriority: 2
        },
        {
          data: 'startTime',
          name: 'startTime',
          width: '4vw',
          responsivePriority: 5
        },
        {
          data: 'endTime',
          name: 'endTime',
          width: '4vw',
          responsivePriority: 6
        },
        {
          data: 'durationMS',
          name: 'durationMS',
          width: '5vw',
          responsivePriority: 4
        },
        {
          data: 'cssClass',
          name: 'cssClass',
          width: '10vw',
          responsivePriority: 3
        },
        {
          data: 'text',
          name: 'text',
          responsivePriority: 1
        }
      ],
      dtOptions: {
        dom: "<'row'<'col-sm-12 col-md-6 gotoLine'><'col-sm-12 col-md-6'f>>" + "<'row'<'dttable col-sm-12'tr>>",
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
    // Add Go To Line input field and buttons to datatable top area DOM
    const gotoLineLabel = document.createElement('label')
    gotoLineLabel.id = 'gotoLineLabel'
    gotoLineLabel.textContent = 'Go To Line:'
    /* c8 ignore next */
    document.querySelector('.gotoLine')?.appendChild(gotoLineLabel)

    const gotoLineInput = document.createElement('input')
    gotoLineInput.id = 'gotoLineInput'
    gotoLineInput.setAttribute('type', 'text')
    gotoLineInput.setAttribute('style', 'width: 75px; margin-left: 10px;')
    /* c8 ignore next */
    document.querySelector('.gotoLine')?.appendChild(gotoLineInput)

    const gotoLineView = document.createElement('button')
    gotoLineView.id = 'gotoLineView'
    gotoLineView.className = 'btn btn-sm btn-info'
    gotoLineView.innerHTML = 'View'
    gotoLineView.setAttribute('type', 'button')
    gotoLineView.setAttribute('style', 'margin-left: 20px; margin-top: -5px;')
    /* c8 ignore next */
    document.querySelector('.gotoLine')?.appendChild(gotoLineView)

    const gotoLineCue = document.createElement('button')
    gotoLineCue.id = 'gotoLineCue'
    gotoLineCue.className = 'btn btn-sm btn-warning'
    gotoLineCue.innerHTML = 'Cue'
    gotoLineCue.setAttribute('type', 'button')
    gotoLineCue.setAttribute('style', 'margin-left: 20px; margin-top: -5px;')
    /* c8 ignore next */
    document.querySelector('.gotoLine')?.appendChild(gotoLineCue)

    const gotoLineGo = document.createElement('button')
    gotoLineGo.id = 'gotoLineGo'
    gotoLineGo.className = 'btn btn-sm btn-danger'
    gotoLineGo.innerHTML = 'GO'
    gotoLineGo.setAttribute('type', 'button')
    gotoLineGo.setAttribute('style', 'margin-left: 20px; margin-top: -5px;')
    /* c8 ignore next */
    document.querySelector('.gotoLine')?.appendChild(gotoLineGo)

    Util.debugLog('LineList module mounted.')
  }
}
</script>

<template>
  <dataTable ref="table" :columns="dtColumns" :data="dtData" :options="dtOptions" class="table table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Start</th>
        <th>End</th>
        <th>Length&nbsp;(ms)</th>
        <th>Class</th>
        <th>Line</th>
      </tr>
    </thead>
  </dataTable>
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
  }
}
</style>
