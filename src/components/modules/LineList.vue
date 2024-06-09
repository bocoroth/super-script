<script setup lang="ts">
// The LineList module displays the datatable containing the current script.

import DataTable from 'datatables.net-vue3'
import DataTablesLib from 'datatables.net'
import DataTablesCore from 'datatables.net-bs5'
import Responsive from 'datatables.net-responsive-bs5'
import Scroller from 'datatables.net-scroller-bs5'
import Select from 'datatables.net-select-bs5'

import { ref, onMounted } from 'vue'
// import { useI18n } from 'vue-i18n'

import { Util } from '../Util'

DataTable.use(DataTablesLib)
DataTable.use(DataTablesCore)
DataTable.use(Responsive)
DataTable.use(Scroller)
DataTable.use(Select)

const dt = ref({})
const table = ref()
// const data = ref([])

// defineExpose({ dt })

onMounted(() => {
  // Add Go To Line input field and buttons to DataTable top area DOM
  dt.value = table.value.dt

  Util.debugLog('LineList module mounted.')
})

const dtColumns = [
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
]

const dtOptions = {
  dom: "<'row'<'col-sm-12 col-md-6 goto-line'><'col-sm-12 col-md-6'f>>" + "<'row'<'dttable col-sm-12'tr>>",
  language: {
    // search: t('LineList.search')
    search: 'Search'
  },
  paging: false,
  responsive: true,
  scrollY: '70vh',
  select: 'single'
}

const dtTestData = [
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
</script>

<template>
  <dataTable
    id="linelist"
    ref="table"
    :columns="dtColumns"
    :data="dtTestData"
    :options="dtOptions"
    class="table table-striped"
    style="width: 100%"
  >
    <thead>
      <tr>
        <!--<th>{{ $t('LineList.number') }}</th>
        <th>{{ $t('LineList.start') }}</th>
        <th>{{ $t('LineList.end') }}</th>
        <th>{{ $t('LineList.length') }}</th>
        <th>{{ $t('LineList.class') }}</th>
        <th>{{ $t('LineList.line') }}</th>-->
        <th>#</th>
        <th>Start</th>
        <th>End</th>
        <th>Length&#x202f;(ms)</th>
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

.goto-line-container {
  .goto-line-input {
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
