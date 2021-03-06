<button type="button" ng-click="open()">Add Gun</button>



 <table st-table="user.guns" class="table table-striped">
            <thead>
                <tr>
                     <th st-sort="name"></th>
                    <th st-sort="name">Powder Manufacturer</th>
                    <th st-sort="name">Powder Name</th>
                    <th st-sort="name">Type</th>
                    <th st-sort="name">Custom Fields</th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="row in user.guns">
                    <td>{{row.manufacturer}}</td>
                    <td>{{row.model}}</td>
                    <td>{{row.type}}</td>
                     <td>
                        <span ng-repeat="field in row.fields">{{field.value}} {{field.name}}{{$last ? '' : ', '}}</span>
                    </td>
                    <td>
                        <input type="button" value="Delete" ng-click="deleteGun(row)"/>
                    </td>
                </tr>
            </tbody>
        </table>
