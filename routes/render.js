
exports.admin = function (req, res) {
  var settings = res.locals._admin.settings,
    custom = res.locals._admin.custom;

  var tables = [];
  var tableGroups = [];
  for (var key in settings) {
      let item = settings[key],
        groupKey = null;
      if (!item.mainview.show || !item.table.pk || item.table.view) continue;

      if (item.group) {
        for (let groupIndex in tableGroups) {
            let group = tableGroups[groupIndex];
            if (group.name === item.group) {
              groupKey = groupIndex;
            }
        }

        if (groupKey) {
          tableGroups[groupKey].tables.push({slug: item.slug, name: item.table.verbose});
        } else {
          tableGroups.push({
            tables: [{slug: item.slug, name: item.table.verbose}],
            name: item.group
          });
        }
      } else {
        tables.push({slug: item.slug, name: item.table.verbose});
      }
  }

  var views = [];
  for (var key in settings) {
      var item = settings[key];
      if (!item.mainview.show || !item.table.view) continue;
      views.push({slug: item.slug, name: item.table.verbose});
  }

  var customs = [];
  for (var key in custom) {
      var item = custom[key].app;
      if (!item || !item.mainview || !item.mainview.show) continue;
      customs.push({slug: item.slug, name: item.verbose});
  }


  res.locals.tableGroups = !tableGroups.length ? null : {items: tableGroups};
  res.locals.tables = !tables.length ? null : {items: tables};
  res.locals.views = !views.length ? null : {items: views};
  res.locals.custom = !customs.length ? null : {items: customs};

  res.locals.partials.header = 'header';
  res.locals.partials.menu = 'menu';
  res.locals.partials.breadcrumbs = 'breadcrumbs';
  res.locals.partials.theme = 'js/theme';

  res.render('base', {

    user: req.session.user,
    csrf: req.csrfToken(),

    url: {
        home: '/'
    }
  });
}

exports.login = function (req, res) {
  res.locals.partials.header = 'header';
  res.locals.partials.theme = 'js/theme';

  res.render('baseLogin', {

    user: req.session.user,
    csrf: req.csrfToken(),

    url: {
        home: '/'
    }
  });
}
