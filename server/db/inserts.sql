INSERT INTO `massaia`.`albums` (`id`, `name`, `cover`, `date`) VALUES ('1', 'MASSAIÁ', 'coverAlbum1.png', '2023-12-21');

INSERT INTO `massaia`.`songs` (`id`, `album_id`, `name`, `position`, `lyrics`, `audio`, `video`, `image`, `date`) VALUES ('1', '1', 'Massaiá', '1', 'Massaiá, que não existe, que seja agora a minha cura', 'https://www.youtube.com/watch?v=ToLeIguEPxY', 'massaia', 'Capa-Massaia-Vol.I', '2023-12-21');
INSERT INTO `massaia`.`songs` (`id`, `album_id`, `name`, `position`, `lyrics`, `audio`, `image`, `date`) VALUES ('2', '1', 'Madalena', '2', 'A ti, avó.', 'https://www.youtube.com/watch?v=aFhQJhuA43w', 'CAPA-Madalena', '2023-12-21');
INSERT INTO `massaia`.`songs` (`id`, `album_id`, `name`, `position`, `lyrics`, `audio`, `image`, `date`) VALUES ('3', '1', 'O homem-Merda', '3', 'Porque todas as guerras são uma mentira. ', 'https://www.youtube.com/watch?v=uIaPa27jWqw', 'HomemMerda', '2023-12-21');
INSERT INTO `massaia`.`songs` (`id`, `album_id`, `name`, `position`, `lyrics`, `audio`, `image`, `date`) VALUES ('4', '1', 'Só a mãe tem', '4', 'Toda a ternura todo o colo', ' https://www.youtube.com/watch?v=PWpXIQXb4hc ', 'CAPA-Madalena', '2023-12-21');
INSERT INTO `massaia`.`songs` (`id`, `album_id`, `name`, `position`, `lyrics`, `audio`, `image`, `date`) VALUES ('5', '1', 'Fado desencontrado', '5', 'Ficava ao teu lado ', 'https://www.youtube.com/watch?v=JsHaLH2fXno', 'fadoDesencontrado', '2023-12-21');
INSERT INTO `massaia`.`songs` (`id`, `album_id`, `name`, `position`, `lyrics`, `audio`, `image`, `date`) VALUES ('6', '1', 'Ficar por aí', '6', 'Para ti, Isabel', 'e.com/watch?v=2Wx1QnC6Bzk', 'ficar-por-ai', '2023-12-21');
INSERT INTO `massaia`.`songs` (`id`, `album_id`, `name`, `position`, `lyrics`, `audio`, `image`, `date`) VALUES ('7', '1', 'O pior de mim', '7', 'O pior de mim', 'https://www.youtube.com/watch?v=FQ8sZinzGtg', 'o-pior-de-mim', '2023-12-21');
INSERT INTO `massaia`.`songs` (`id`, `album_id`, `name`, `position`, `lyrics`, `audio`, `image`, `date`) VALUES ('8', '1', 'À parte da vida', '8', 'Um mundo à parte dos dias', 'https://www.youtube.com/watch?v=mANKzzpul54', 'ApartedaVida', '2023-12-21');
INSERT INTO `massaia`.`songs` (`id`, `album_id`, `name`, `position`, `audio`, `image`, `date`) VALUES ('9', '1', 'Vinte e dois', '9', 'https://www.youtube.com/watch?v=1uCOnH1Uzaw', 'CAPA-Madalena', '2023-12-21');


INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('1', 'Helena Caspurro');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('2', 'Pedro Carvalho de Almeida');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('3', 'José M. Parra a.k.a. Orange Sandalwood');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('4', 'Francisco Providência');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('5', 'Carlos Silva');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('6', 'António C. Valente');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('7', 'António Pinheiro da Silva');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('8', 'Brendan Hemsworth');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('9', 'Nuno Aragão');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('10', 'Nuno Couto');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('11', 'João Maya');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('12', 'Inês Lamela');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('13', 'Pedro Almeida');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('14', 'Beatriz Capote');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('15', 'Joana Machado Araújo');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('16', 'Ana Morais');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('17', 'Edgar Moutinho');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('18', 'Inês Guedes de Oliveira');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('19', 'José Grilo');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('20', 'Marta Lima');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('21', 'Matilde Reigó');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('22', 'Raúl Moutinho');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('23', 'Rui Ferro');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('24', 'Susete Rebelo');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('25', 'Jorge Costa');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('26', 'Mário Santos');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('27', 'José Emídio');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('28', 'Helena Barbosa');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('29', 'Isabel Calado');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('30', 'Manuel Caspurro');
INSERT INTO `massaia`.`authors` (`id`, `name`) VALUES ('31', 'Sónia Teles e Silva');



INSERT INTO `massaia`.`art_pieces` (`id`, `song_id`, `author_id`, `image`) VALUES ('1', '1', '4', 'Capa-Massaia-Vol.I');
INSERT INTO `massaia`.`art_pieces` (`id`, `song_id`, `author_id`, `image`) VALUES ('2', '2', '4', 'CAPA-Madalena');
INSERT INTO `massaia`.`art_pieces` (`id`, `song_id`, `author_id`, `image`) VALUES ('3', '3', '27', 'HomemMerda');
INSERT INTO `massaia`.`art_pieces` (`id`, `song_id`, `author_id`, `image`) VALUES ('4', '5', '28', 'fadoDesencontrado');
INSERT INTO `massaia`.`art_pieces` (`id`, `song_id`, `author_id`, `image`) VALUES ('5', '5', '28', 'IMG_7206');
INSERT INTO `massaia`.`art_pieces` (`id`, `song_id`, `author_id`, `image`) VALUES ('6', '5', '28', 'IMG_7203');
INSERT INTO `massaia`.`art_pieces` (`id`, `song_id`, `author_id`, `image`) VALUES ('7', '6', '29', 'ficar-por-ai');
INSERT INTO `massaia`.`art_pieces` (`id`, `song_id`, `author_id`, `image`) VALUES ('8', '7', '30', 'o-pior-de-mim');
INSERT INTO `massaia`.`art_pieces` (`id`, `song_id`, `author_id`, `image`) VALUES ('9', '8', '31', 'ApartedaVida');



INSERT INTO `massaia`.`moments` (`id`, `name`, `image`) VALUES ('1', 'Concerto de lançamento', 'moments1');
INSERT INTO `massaia`.`moments` (`id`, `name`, `image`) VALUES ('2', 'Concerto de lançamento', 'moments2');



INSERT INTO `massaia`.`art_pieces` (`id`, `song_id`, `author_id`, `image`) VALUES ('10', '2', '2', 'Lena_sRGB@800dpi_HIGH.jpg');



INSERT INTO `massaia`.`roles` (`id`, `name`) VALUES ('1', 'voz');
INSERT INTO `massaia`.`roles` (`id`, `name`) VALUES ('2', 'letra');
INSERT INTO `massaia`.`roles` (`id`, `name`) VALUES ('3', 'composição');
INSERT INTO `massaia`.`roles` (`id`, `name`) VALUES ('4', 'piano');
INSERT INTO `massaia`.`roles` (`id`, `name`) VALUES ('5', 'mistura');
INSERT INTO `massaia`.`roles` (`id`, `name`) VALUES ('6', 'masterização');
INSERT INTO `massaia`.`roles` (`id`, `name`) VALUES ('7', 'captação sonora e gravação');

UPDATE `massaia`.`songs` SET `video` = 'massaia.mp4' WHERE (`id` = '1');
UPDATE `massaia`.`songs` SET `image` = 'Capa-Massaia-Voli.jpg' WHERE (`id` = '1');
UPDATE `massaia`.`songs` SET `image` = 'CAPA-Madalena.jpg' WHERE (`id` = '2');
UPDATE `massaia`.`songs` SET `image` = 'HomemMerda.jpg' WHERE (`id` = '3');
UPDATE `massaia`.`songs` SET `image` = 'CAPA-Madalena.jpg' WHERE (`id` = '4');
UPDATE `massaia`.`songs` SET `image` = 'fadoDesencontrado.jpeg' WHERE (`id` = '5');
UPDATE `massaia`.`songs` SET `image` = 'ficar-por-ai.jpg' WHERE (`id` = '6');
UPDATE `massaia`.`songs` SET `image` = 'o-pior-de-mim.jpg' WHERE (`id` = '7');
UPDATE `massaia`.`songs` SET `image` = 'ApartedaVida.jpg' WHERE (`id` = '8');
UPDATE `massaia`.`songs` SET `image` = 'CAPA-Madalena.jpg' WHERE (`id` = '9');
UPDATE `massaia`.`songs` SET `video` = 'VIDA.mp4' WHERE (`id` = '8');
UPDATE `massaia`.`songs` SET `image` = 'musicaalbum2.jpg' WHERE (`id` = '10');
UPDATE `massaia`.`songs` SET `audio` = 'Massaia_Master.wav' WHERE (`id` = '1');
UPDATE `massaia`.`songs` SET `audio` = 'Madalena_New_Master.wav' WHERE (`id` = '2');
UPDATE `massaia`.`songs` SET `audio` = 'O_homem-Merda_New_Master.wav' WHERE (`id` = '3');
UPDATE `massaia`.`songs` SET `audio` = 'So_a _mae_tem_New_3_Master.wav' WHERE (`id` = '4');
UPDATE `massaia`.`songs` SET `audio` = 'Fado_Desencontrado_Master.wav' WHERE (`id` = '5');
UPDATE `massaia`.`songs` SET `audio` = 'Ficar_por_ai_New_Master.wav' WHERE (`id` = '6');
UPDATE `massaia`.`songs` SET `audio` = 'O_pior_de_mim_New_3_Master.wav' WHERE (`id` = '7');
UPDATE `massaia`.`songs` SET `audio` = 'A_parte_da_vida_New_3_Master.wav' WHERE (`id` = '8');
UPDATE `massaia`.`songs` SET `audio` = 'Vinte_dois_New_Master.wav' WHERE (`id` = '9');
UPDATE `massaia`.`songs` SET `audio` = 'O_homem-Merda_New_Master.wav' WHERE (`id` = '10');

UPDATE `massaia`.`albums` SET `cover` = 'coverAlbum2.png' WHERE (`id` = '2');

UPDATE `massaia`.`art_pieces` SET `image` = 'Capa-Massaia-Voli.jpg' WHERE (`id` = '1');
UPDATE `massaia`.`art_pieces` SET `image` = 'CAPA-Madalena.jpg' WHERE (`id` = '2');
UPDATE `massaia`.`art_pieces` SET `image` = 'HomemMerda.jpg' WHERE (`id` = '3');
UPDATE `massaia`.`art_pieces` SET `image` = 'fadoDesencontrado.jpeg' WHERE (`id` = '4');
UPDATE `massaia`.`art_pieces` SET `image` = 'IMG_7206.jpeg' WHERE (`id` = '5');
UPDATE `massaia`.`art_pieces` SET `image` = 'IMG_7203.jpeg' WHERE (`id` = '6');
UPDATE `massaia`.`art_pieces` SET `image` = 'ficar-por-ai.jpg' WHERE (`id` = '7');
UPDATE `massaia`.`art_pieces` SET `image` = 'o-pior-de-mim.jpg' WHERE (`id` = '8');
UPDATE `massaia`.`art_pieces` SET `image` = 'ApartedaVida.jpg' WHERE (`id` = '9');

UPDATE `massaia`.`authors` SET `image` = 'pedro_almeida.jpg' WHERE (`id` = '2');
UPDATE `massaia`.`authors` SET `image` = 'helena_caspurro.jpeg' WHERE (`id` = '1');

UPDATE `massaia`.`moments` SET `image` = 'moments1.jpg' WHERE (`id` = '1');
UPDATE `massaia`.`moments` SET `image` = 'moments2.jpg' WHERE (`id` = '2');
