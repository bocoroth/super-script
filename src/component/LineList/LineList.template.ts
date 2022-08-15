const html = (str: TemplateStringsArray) => { return str.raw.join() }

export const lineListTemplate = html`

<table id="line_table" class="compact hover table-dark table-striped">
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
  <tbody>
    <tr>
      <td>1</td>
      <td>00:00:00.000</td>
      <td>00:00:01.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        Lorem ipsum dolor sit amet,
      </td>
    </tr>
    <tr>
      <td>2</td>
      <td>00:00:01.000</td>
      <td>00:00:02.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        consectetur adipiscing elit.
      </td>
    </tr>
    <tr>
      <td>3</td>
      <td>00:00:02.000</td>
      <td>00:00:03.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        Vestibulum tincidunt pretium leo,
      </td>
    </tr>
    <tr>
      <td>4</td>
      <td>00:00:03.000</td>
      <td>00:00:04.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        et hendrerit arcu dictum condimentum.
      </td>
    </tr>
    <tr>
      <td>5</td>
      <td>00:00:04.000</td>
      <td>00:00:05.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        Nunc dui risus,
      </td>
    </tr>
    <tr>
      <td>6</td>
      <td>00:00:05.000</td>
      <td>00:00:06.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        tincidunt at semper et,
      </td>
    </tr>
    <tr>
      <td>7</td>
      <td>00:00:06.000</td>
      <td>00:00:07.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        facilisis et quam.
      </td>
    </tr>
    <tr>
      <td>8</td>
      <td>00:00:07.000</td>
      <td>00:00:08.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        Phasellus at diam suscipit,
      </td>
    </tr>
    <tr>
      <td>10</td>
      <td>00:00:09.000</td>
      <td>00:00:10.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        egestas libero et, scelerisque enim.
      </td>
    </tr>
    <tr>
      <td>11</td>
      <td>00:00:10.000</td>
      <td>00:00:11.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        Vestibulum risus tellus,
      </td>
    </tr>
    <tr>
      <td>12</td>
      <td>00:00:11.000</td>
      <td>00:00:12.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        volutpat sit amet rhoncus eget,
      </td>
    </tr>
    <tr>
      <td>13</td>
      <td>00:00:12.000</td>
      <td>00:00:13.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        feugiat id sem.
      </td>
    </tr>
    <tr>
      <td>14</td>
      <td>00:00:13.000</td>
      <td>00:00:14.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        Proin pellentesque nunc at massa tincidunt tempus.
      </td>
    </tr>
    <tr>
      <td>15</td>
      <td>00:00:14.000</td>
      <td>00:00:15.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        Duis iaculis ac tellus non laoreet.
      </td>
    </tr>
    <tr>
      <td>16</td>
      <td>00:00:15.000</td>
      <td>00:00:16.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        Nulla aliquet pulvinar augue,
      </td>
    </tr>
    <tr>
      <td>17</td>
      <td>00:00:16.000</td>
      <td>00:00:17.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        vel blandit ipsum ultricies nec.
      </td>
    </tr>
    <tr>
      <td>18</td>
      <td>00:00:17.000</td>
      <td>00:00:18.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        Donec rutrum urna tincidunt leo auctor hendrerit.
      </td>
    </tr>
    <tr>
      <td>19</td>
      <td>00:00:18.000</td>
      <td>00:00:19.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        Sed pellentesque porttitor mauris,
      </td>
    </tr>
    <tr>
      <td>20</td>
      <td>00:00:19.000</td>
      <td>00:00:20.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        ac malesuada metus.
      </td>
    </tr>
    <tr>
      <td>21</td>
      <td>00:00:20.000</td>
      <td>00:00:21.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        Duis sodales convallis enim eu convallis.
      </td>
    </tr>
    <tr>
      <td>22</td>
      <td>00:00:21.000</td>
      <td>00:00:22.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        Maecenas eget porta risus,
      </td>
    </tr>
    <tr>
      <td>23</td>
      <td>00:00:22.000</td>
      <td>00:00:23.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        eget auctor ligula.
      </td>
    </tr>
    <tr>
      <td>24</td>
      <td>00:00:23.000</td>
      <td>00:00:24.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        consectetur adipiscing elit,
      </td>
    </tr>
    <tr>
      <td>25</td>
      <td>00:00:24.000</td>
      <td>00:00:25.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </td>
    </tr>
    <tr>
      <td>26</td>
      <td>00:00:25.000</td>
      <td>00:00:26.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        Ut enim ad minim veniam,
      </td>
    </tr>
    <tr>
      <td>27</td>
      <td>00:00:26.000</td>
      <td>00:00:27.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </td>
    </tr>
    <tr>
      <td>28</td>
      <td>00:00:27.000</td>
      <td>00:00:28.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </td>
    </tr>
    <tr>
      <td>29</td>
      <td>00:00:28.000</td>
      <td>00:00:29.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        Excepteur sint occaecat cupidatat non proident,
      </td>
    </tr>
    <tr>
      <td>30</td>
      <td>00:00:29.000</td>
      <td>00:00:30.000</td>
      <td>1000</td>
      <td>test</td>
      <td>
        sunt in culpa qui officia deserunt mollit anim id est laborum.
      </td>
    </tr>
  </tbody>
</table>

`
