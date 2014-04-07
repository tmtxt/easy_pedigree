INSERT INTO people VALUES (5, '2.1 wife 2', NULL, NULL, 1, NULL, NULL, NULL, 1, NULL, NULL, NULL);
INSERT INTO people VALUES (7, '2.3 husband', NULL, NULL, 1, NULL, NULL, NULL, 1, NULL, NULL, NULL);
INSERT INTO people VALUES (10, '3.2 wife', NULL, NULL, 1, NULL, NULL, NULL, 1, NULL, NULL, NULL);
INSERT INTO people VALUES (1, '1 husband', NULL, NULL, 1, NULL, NULL, 'root.png', 1, NULL, NULL, NULL);
INSERT INTO people VALUES (3, '2.1 husband', NULL, NULL, 1, NULL, NULL, 'f2-1.jpg', 1, NULL, NULL, NULL);
INSERT INTO people VALUES (6, '2.2 husband', NULL, NULL, 1, NULL, NULL, 'f2-2.jpg', 1, NULL, NULL, NULL);
INSERT INTO people VALUES (9, '3.1 husband', NULL, NULL, 1, NULL, NULL, 'f3-1.JPG', 1, NULL, NULL, NULL);
INSERT INTO people VALUES (11, '3.2 husband', NULL, NULL, 1, NULL, NULL, 'f3-2.jpg', 1, NULL, NULL, NULL);
INSERT INTO people VALUES (14, '2.2 wife', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL);
INSERT INTO people VALUES (16, '3.4 husband', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL);
INSERT INTO people VALUES (18, '4.3 husband', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL);
INSERT INTO people VALUES (15, '3.4 wife', NULL, NULL, NULL, NULL, NULL, 'root.png', 1, NULL, NULL, NULL);
INSERT INTO people VALUES (12, '4.1 wife', NULL, NULL, 1, NULL, NULL, 'f2-3.jpg', 1, NULL, NULL, NULL);
INSERT INTO people VALUES (17, '4.2 wife', NULL, NULL, NULL, NULL, NULL, 'f2-1.jpg', 1, NULL, NULL, NULL);
INSERT INTO people VALUES (13, '3.3 husband', NULL, NULL, NULL, NULL, NULL, 'f3-2.jpg', 1, NULL, NULL, NULL);
INSERT INTO people VALUES (19, '5.1 wife', NULL, NULL, NULL, NULL, NULL, 'f3-1.JPG', 1, NULL, NULL, NULL);
INSERT INTO people VALUES (26, '2.4 Husband', '1980-04-06', NULL, 1, 'Worker', 'This is
fdskj
def', 'f1-4.png', 1, '0987654321', '123456789', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
INSERT INTO people VALUES (8, '2.3 wife', NULL, '1980-04-06', 0, NULL, NULL, 'f2-3.jpg', 2, NULL, NULL, NULL);
INSERT INTO people VALUES (4, '2.1 wife', NULL, NULL, 1, NULL, NULL, 'f2 wife.jpg', 1, NULL, NULL, NULL);
INSERT INTO people VALUES (2, '1 wife', NULL, NULL, 1, NULL, NULL, 'f3-1.jpg', 1, NULL, NULL, NULL);
INSERT INTO people VALUES (33, 'aaaa', NULL, NULL, 1, 'qqqq', 'rrrr', 'custom.14094rxsap5c.jpg', 2, NULL, NULL, 'oooo');

INSERT INTO marriage_relations VALUES (1, 1, 2, NULL, NULL, NULL, NULL, NULL);
INSERT INTO marriage_relations VALUES (2, 3, 4, NULL, NULL, NULL, NULL, 1);
INSERT INTO marriage_relations VALUES (3, 3, 5, NULL, NULL, NULL, NULL, 2);
INSERT INTO marriage_relations VALUES (4, 6, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO marriage_relations VALUES (5, 7, 8, NULL, NULL, NULL, NULL, NULL);
INSERT INTO marriage_relations VALUES (6, 11, 10, NULL, NULL, NULL, NULL, NULL);
INSERT INTO marriage_relations VALUES (7, 9, 10, NULL, NULL, NULL, NULL, NULL);
INSERT INTO marriage_relations VALUES (23, 6, 14, NULL, NULL, NULL, NULL, NULL);
INSERT INTO marriage_relations VALUES (24, 16, 15, NULL, NULL, NULL, NULL, NULL);

INSERT INTO pedigrees VALUES (1, 'abc', NULL, NULL, 1);

INSERT INTO people_hierarchy_relations VALUES (1, 1, 2, 3, NULL);
INSERT INTO people_hierarchy_relations VALUES (2, 1, 2, 6, NULL);
INSERT INTO people_hierarchy_relations VALUES (3, 1, 2, 8, NULL);
INSERT INTO people_hierarchy_relations VALUES (4, 3, 4, 9, NULL);
INSERT INTO people_hierarchy_relations VALUES (5, 3, 4, 11, NULL);
INSERT INTO people_hierarchy_relations VALUES (9, 9, 10, 12, NULL);
INSERT INTO people_hierarchy_relations VALUES (10, 7, 8, 13, NULL);
INSERT INTO people_hierarchy_relations VALUES (11, 6, 14, 15, NULL);
INSERT INTO people_hierarchy_relations VALUES (13, 16, 15, 17, NULL);
INSERT INTO people_hierarchy_relations VALUES (14, 16, 15, 18, NULL);
INSERT INTO people_hierarchy_relations VALUES (15, NULL, 17, 19, NULL);
INSERT INTO people_hierarchy_relations VALUES (16, 1, 2, 26, NULL);
INSERT INTO people_hierarchy_relations VALUES (19, 1, 2, 33, NULL);

INSERT INTO users VALUES (1, '$2a$10$Rhy3RTuk3/TSa27Wom.nrupVZYchrcxWEh1equAD6YmGS6QStruSS', 'admin');
