USE `massaia`;

INSERT INTO `albums` (`id`, `name`, `cover`, `date`) VALUES ('1', 'MASSAIÁ', 'coverAlbum1.png', '2023-12-21');
INSERT INTO `albums` (`id`, `name`, `cover`, `date`) VALUES ('2', 'Volume2', 'coverAlbum2.png', '2023-12-21');

INSERT INTO `songs` (`id`, `album_id`, `name`, `position`, `lyrics`, `audio`, `video`, `image`, `date`) VALUES ('1', '1', 'Massaiá', '1', 'Massaiá, que não existe, que seja agora a minha cura', 'https://www.youtube.com/watch?v=ToLeIguEPxY', 'massaia', 'Capa-Massaia-Vol.I', '2023-12-21');
INSERT INTO `songs` (`id`, `album_id`, `name`, `position`, `lyrics`, `audio`, `image`, `date`) VALUES ('2', '1', 'Madalena', '2', 'A ti, avó.', 'https://www.youtube.com/watch?v=aFhQJhuA43w', 'CAPA-Madalena', '2023-12-21');
INSERT INTO `songs` (`id`, `album_id`, `name`, `position`, `lyrics`, `audio`, `image`, `date`) VALUES ('3', '1', 'O homem-Merda', '3', 'Porque todas as guerras são uma mentira. ', 'https://www.youtube.com/watch?v=uIaPa27jWqw', 'HomemMerda', '2023-12-21');
INSERT INTO `songs` (`id`, `album_id`, `name`, `position`, `lyrics`, `audio`, `image`, `date`) VALUES ('4', '1', 'Só a mãe tem', '4', 'Toda a ternura todo o colo', ' https://www.youtube.com/watch?v=PWpXIQXb4hc ', 'CAPA-Madalena', '2023-12-21');
INSERT INTO `songs` (`id`, `album_id`, `name`, `position`, `lyrics`, `audio`, `image`, `date`) VALUES ('5', '1', 'Fado desencontrado', '5', 'Ficava ao teu lado ', 'https://www.youtube.com/watch?v=JsHaLH2fXno', 'fadoDesencontrado', '2023-12-21');
INSERT INTO `songs` (`id`, `album_id`, `name`, `position`, `lyrics`, `audio`, `image`, `date`) VALUES ('6', '1', 'Ficar por aí', '6', 'Para ti, Isabel', 'e.com/watch?v=2Wx1QnC6Bzk', 'ficar-por-ai', '2023-12-21');
INSERT INTO `songs` (`id`, `album_id`, `name`, `position`, `lyrics`, `audio`, `image`, `date`) VALUES ('7', '1', 'O pior de mim', '7', 'O pior de mim', 'https://www.youtube.com/watch?v=FQ8sZinzGtg', 'o-pior-de-mim', '2023-12-21');
INSERT INTO `songs` (`id`, `album_id`, `name`, `position`, `lyrics`, `audio`, `image`, `date`) VALUES ('8', '1', 'À parte da vida', '8', 'Um mundo à parte dos dias', 'https://www.youtube.com/watch?v=mANKzzpul54', 'ApartedaVida', '2023-12-21');
INSERT INTO `songs` (`id`, `album_id`, `name`, `position`, `audio`, `image`, `date`) VALUES ('9', '1', 'Vinte e dois', '9', 'https://www.youtube.com/watch?v=1uCOnH1Uzaw', 'CAPA-Madalena', '2023-12-21');
INSERT INTO `songs` (`id`, `album_id`, `name`, `position`, `audio`, `image`, `date`) VALUES ('10', '2', 'Minha Música', '1', 'O_homem-Merda_New_Master.wav', 'CAPA-Madalena.jpg', '2023-12-21');


INSERT INTO `authors` (`id`, `name`) VALUES ('1', 'Helena Caspurro');
INSERT INTO `authors` (`id`, `name`) VALUES ('2', 'Pedro Carvalho de Almeida');
INSERT INTO `authors` (`id`, `name`) VALUES ('3', 'José M. Parra a.k.a. Orange Sandalwood');
INSERT INTO `authors` (`id`, `name`) VALUES ('4', 'Francisco Providência');
INSERT INTO `authors` (`id`, `name`) VALUES ('5', 'Carlos Silva');
INSERT INTO `authors` (`id`, `name`) VALUES ('6', 'António C. Valente');
INSERT INTO `authors` (`id`, `name`) VALUES ('7', 'António Pinheiro da Silva');
INSERT INTO `authors` (`id`, `name`) VALUES ('8', 'Brendan Hemsworth');
INSERT INTO `authors` (`id`, `name`) VALUES ('9', 'Nuno Aragão');
INSERT INTO `authors` (`id`, `name`) VALUES ('10', 'Nuno Couto');
INSERT INTO `authors` (`id`, `name`) VALUES ('11', 'João Maya');
INSERT INTO `authors` (`id`, `name`) VALUES ('12', 'Inês Lamela');
INSERT INTO `authors` (`id`, `name`) VALUES ('13', 'Pedro Almeida');
INSERT INTO `authors` (`id`, `name`) VALUES ('14', 'Beatriz Capote');
INSERT INTO `authors` (`id`, `name`) VALUES ('15', 'Joana Machado Araújo');
INSERT INTO `authors` (`id`, `name`) VALUES ('16', 'Ana Morais');
INSERT INTO `authors` (`id`, `name`) VALUES ('17', 'Edgar Moutinho');
INSERT INTO `authors` (`id`, `name`) VALUES ('18', 'Inês Guedes de Oliveira');
INSERT INTO `authors` (`id`, `name`) VALUES ('19', 'José Grilo');
INSERT INTO `authors` (`id`, `name`) VALUES ('20', 'Marta Lima');
INSERT INTO `authors` (`id`, `name`) VALUES ('21', 'Matilde Reigó');
INSERT INTO `authors` (`id`, `name`) VALUES ('22', 'Raúl Moutinho');
INSERT INTO `authors` (`id`, `name`) VALUES ('23', 'Rui Ferro');
INSERT INTO `authors` (`id`, `name`) VALUES ('24', 'Susete Rebelo');
INSERT INTO `authors` (`id`, `name`) VALUES ('25', 'Jorge Costa');
INSERT INTO `authors` (`id`, `name`) VALUES ('26', 'Mário Santos');
INSERT INTO `authors` (`id`, `name`) VALUES ('27', 'José Emídio');
INSERT INTO `authors` (`id`, `name`) VALUES ('28', 'Helena Barbosa');
INSERT INTO `authors` (`id`, `name`) VALUES ('29', 'Isabel Calado');
INSERT INTO `authors` (`id`, `name`) VALUES ('30', 'Manuel Caspurro');
INSERT INTO `authors` (`id`, `name`) VALUES ('31', 'Sónia Teles e Silva');
INSERT INTO `authors` (`id`, `name`, `image`) VALUES ('32', 'Augusto Aguiar ', 'augusto_aguiar.jpg');
INSERT INTO `authors` (`id`, `name`, `image`) VALUES ('33', 'Fátima Pombo', 'fatima_pombo.jpg');
INSERT INTO `authors` (`id`, `name`, `image`) VALUES ('34', 'Francisco Badilla ', 'francisco_badila.jpg');
INSERT INTO `authors` (`id`, `name`, `image`) VALUES ('35', 'Helena Branco', 'helena_branco.jpg');
INSERT INTO `authors` (`id`, `name`, `image`) VALUES ('36', 'Inês Calado', 'ines_calado.jpg');
INSERT INTO `authors` (`id`, `name`, `image`) VALUES ('37', 'Joana Quental', 'joana_quental.jpg');
INSERT INTO `authors` (`id`, `name`, `image`) VALUES ('38', 'João Baeta ', 'joao_baeta.jpg');
INSERT INTO `authors` (`id`, `name`, `image`) VALUES ('39', 'Joaquim Branco', 'joaquim_branco.jpg');
INSERT INTO `authors` (`id`, `name`, `image`) VALUES ('40', 'Nuno Higino ', 'nuno_higino.jpg');
INSERT INTO `authors` (`id`, `name`, `image`) VALUES ('41', 'Paulo Vaz de Carvalho ', 'paulo_vaz.jpg');
INSERT INTO `authors` (`id`, `name`, `image`) VALUES ('42', 'Pedro Pereira', 'pedro-pereira.png');
INSERT INTO `authors` (`id`, `name`, `image`) VALUES ('43', 'Daniela Waitzmann ', 'Daniela-Waitzmann.jpg');
INSERT INTO `authors` (`id`, `name`, `image`, `title`) VALUES ('44', 'Álvaro Sousa ', 'Alvaro_perfilID-400x375.jpg', 'Criação, desenho ');
INSERT INTO `authors` (`id`, `name`, `image`, `title`) VALUES ('45', 'Rui Costa', 's200_rui.costa.jpg', 'Criação, desenho ');
INSERT INTO `authors` (`id`, `name`, `image`, `title`) VALUES ('46', 'Paulo Hernâni', 'B3996C27_D5F80768.jpg', 'Criação, pintura ');
INSERT INTO `authors` (`id`, `name`, `title`) VALUES ('47', 'Eduarda Ferreira ', 'Criação, pintura ');
INSERT INTO `authors` (`id`, `name`, `image`, `title`) VALUES ('48', 'Isaque Pinheiro', 'Isaque-Pinheiro.jpg', 'Criação, escultura ');
INSERT INTO `authors` (`id`, `name`, `image`, `title`) VALUES ('49', 'Inês Silva', '', 'Intérprete, canto ');
INSERT INTO `authors` (`id`, `name`, `image`, `title`) VALUES ('50', 'Sara Rodrigues', '', 'Intérprete, canto ');
INSERT INTO `authors` (`id`, `name`, `image`, `title`) VALUES ('51', 'Olinda Martins', 'olinda-martins.png', 'Criação gráfica ');
INSERT INTO `authors` (`id`, `name`, `title`) VALUES ('52', 'Diana Ferreira', 'Criação, animação de vídeo ');
INSERT INTO `authors` (`id`, `name`, `title`) VALUES ('53', 'Arnaldo Fonseca', 'Intérprete, acordeão');
INSERT INTO `authors` (`id`, `name`, `title`) VALUES ('54', 'Valentina Idini', 'Intérprete, canto ');
INSERT INTO `authors` (`id`, `name`, `title`) VALUES ('55', 'Fausto Pizzol ', 'Intérprete, baixo elétrico ');


INSERT INTO `art_pieces` (`id`, `song_id`, `author_id`, `image`) VALUES ('1', '1', '4', 'Capa-Massaia-Vol.I');
INSERT INTO `art_pieces` (`id`, `song_id`, `author_id`, `image`) VALUES ('2', '2', '4', 'CAPA-Madalena');
INSERT INTO `art_pieces` (`id`, `song_id`, `author_id`, `image`) VALUES ('3', '3', '27', 'HomemMerda');
INSERT INTO `art_pieces` (`id`, `song_id`, `author_id`, `image`) VALUES ('4', '5', '28', 'fadoDesencontrado');
INSERT INTO `art_pieces` (`id`, `song_id`, `author_id`, `image`) VALUES ('5', '5', '28', 'IMG_7206');
INSERT INTO `art_pieces` (`id`, `song_id`, `author_id`, `image`) VALUES ('6', '5', '28', 'IMG_7203');
INSERT INTO `art_pieces` (`id`, `song_id`, `author_id`, `image`) VALUES ('7', '6', '29', 'ficar-por-ai');
INSERT INTO `art_pieces` (`id`, `song_id`, `author_id`, `image`) VALUES ('8', '7', '30', 'o-pior-de-mim');
INSERT INTO `art_pieces` (`id`, `song_id`, `author_id`, `image`) VALUES ('9', '8', '31', 'ApartedaVida');



INSERT INTO `moments` (`id`, `name`, `image`) VALUES ('1', 'Concerto de lançamento', 'moments1');
INSERT INTO `moments` (`id`, `name`, `image`) VALUES ('2', 'Concerto de lançamento', 'moments2');



INSERT INTO `art_pieces` (`id`, `song_id`, `author_id`, `image`) VALUES ('10', '2', '2', 'Lena_sRGB@800dpi_HIGH.jpg');



INSERT INTO `roles` (`id`, `name`) VALUES ('1', 'voz');
INSERT INTO `roles` (`id`, `name`) VALUES ('2', 'letra');
INSERT INTO `roles` (`id`, `name`) VALUES ('3', 'composição');
INSERT INTO `roles` (`id`, `name`) VALUES ('4', 'piano');
INSERT INTO `roles` (`id`, `name`) VALUES ('5', 'mistura');
INSERT INTO `roles` (`id`, `name`) VALUES ('6', 'masterização');
INSERT INTO `roles` (`id`, `name`) VALUES ('7', 'captação sonora e gravação');
INSERT INTO `roles` (`id`, `name`) VALUES ('8', 'argumento');
INSERT INTO `roles` (`id`, `name`) VALUES ('9', 'realização');
INSERT INTO `roles` (`id`, `name`) VALUES ('10', 'produção');
INSERT INTO `roles` (`id`, `name`) VALUES ('11', 'produtor associado');
INSERT INTO `roles` (`id`, `name`) VALUES ('12', 'direção artística');

INSERT INTO `songs_has_authors_has_roles` (`roles_id`, `songs_id`, `authors_id`) VALUES ('1', '1', '1');
INSERT INTO `songs_has_authors_has_roles` (`roles_id`, `songs_id`, `authors_id`) VALUES ('1', '1', '2');
INSERT INTO `songs_has_authors_has_roles` (`roles_id`, `songs_id`, `authors_id`) VALUES ('2', '1', '2');
INSERT INTO `songs_has_authors_has_roles` (`roles_id`, `songs_id`, `authors_id`) VALUES ('2', '1', '1');
INSERT INTO `songs_has_authors_has_roles` (`roles_id`, `songs_id`, `authors_id`) VALUES ('4', '1', '3');
INSERT INTO `songs_has_authors_has_roles` (`roles_id`, `songs_id`, `authors_id`) VALUES ('3', '1', '3');
INSERT INTO `songs_has_authors_has_roles` (`roles_id`, `songs_id`, `authors_id`) VALUES ('8', '1', '5');
INSERT INTO `songs_has_authors_has_roles` (`roles_id`, `songs_id`, `authors_id`) VALUES ('9', '1', '5');
INSERT INTO `songs_has_authors_has_roles` (`roles_id`, `songs_id`, `authors_id`) VALUES ('8', '1', '1');
INSERT INTO `songs_has_authors_has_roles` (`roles_id`, `songs_id`, `authors_id`) VALUES ('8', '1', '2');
INSERT INTO `songs_has_authors_has_roles` (`roles_id`, `songs_id`, `authors_id`) VALUES ('9', '1', '1');
INSERT INTO `songs_has_authors_has_roles` (`roles_id`, `songs_id`, `authors_id`) VALUES ('9', '1', '2');
INSERT INTO `songs_has_authors_has_roles` (`roles_id`, `songs_id`, `authors_id`) VALUES ('10', '1', '1');
INSERT INTO `songs_has_authors_has_roles` (`roles_id`, `songs_id`, `authors_id`) VALUES ('11', '1', '6');
INSERT INTO `songs_has_authors_has_roles` (`roles_id`, `songs_id`, `authors_id`) VALUES ('12', '1', '1');
INSERT INTO `songs_has_authors_has_roles` (`roles_id`, `songs_id`, `authors_id`) VALUES ('12', '1', '2');


UPDATE `songs` SET `video` = 'massaia.mp4' WHERE (`id` = '1');
UPDATE `songs` SET `image` = 'Capa-Massaia-Voli.jpg' WHERE (`id` = '1');
UPDATE `songs` SET `image` = 'CAPA-Madalena.jpg' WHERE (`id` = '2');
UPDATE `songs` SET `image` = 'HomemMerda.jpg' WHERE (`id` = '3');
UPDATE `songs` SET `image` = 'CAPA-Madalena.jpg' WHERE (`id` = '4');
UPDATE `songs` SET `image` = 'fadoDesencontrado.jpeg' WHERE (`id` = '5');
UPDATE `songs` SET `image` = 'ficar-por-ai.jpg' WHERE (`id` = '6');
UPDATE `songs` SET `image` = 'o-pior-de-mim.jpg' WHERE (`id` = '7');
UPDATE `songs` SET `image` = 'ApartedaVida.jpg' WHERE (`id` = '8');
UPDATE `songs` SET `image` = 'CAPA-Madalena.jpg' WHERE (`id` = '9');
UPDATE `songs` SET `video` = 'VIDA.mp4' WHERE (`id` = '8');
UPDATE `songs` SET `image` = 'musicaalbum2.jpg' WHERE (`id` = '10');
UPDATE `songs` SET `audio` = 'Massaia_Master.wav' WHERE (`id` = '1');
UPDATE `songs` SET `audio` = 'Madalena_New_Master.wav' WHERE (`id` = '2');
UPDATE `songs` SET `audio` = 'O_homem-Merda_New_Master.wav' WHERE (`id` = '3');
UPDATE `songs` SET `audio` = 'So_a_mae_tem_New_3_Master.wav' WHERE (`id` = '4');
UPDATE `songs` SET `audio` = 'Fado_Desencontrado_Master.wav' WHERE (`id` = '5');
UPDATE `songs` SET `audio` = 'Ficar_por_ai_New_Master.wav' WHERE (`id` = '6');
UPDATE `songs` SET `audio` = 'O_pior_de_mim_New_3_Master.wav' WHERE (`id` = '7');
UPDATE `songs` SET `audio` = 'A_parte_da_vida_New_3_Master.wav' WHERE (`id` = '8');
UPDATE `songs` SET `audio` = 'Vinte_dois_New_Master.wav' WHERE (`id` = '9');
UPDATE `songs` SET `audio` = 'O_homem-Merda_New_Master.wav' WHERE (`id` = '10');

UPDATE `albums` SET `cover` = 'coverAlbum2.png' WHERE (`id` = '2');

UPDATE `art_pieces` SET `image` = 'Capa-Massaia-Voli.jpg' WHERE (`id` = '1');
UPDATE `art_pieces` SET `image` = 'CAPA-Madalena.jpg' WHERE (`id` = '2');
UPDATE `art_pieces` SET `image` = 'HomemMerda.jpg' WHERE (`id` = '3');
UPDATE `art_pieces` SET `image` = 'fadoDesencontrado.jpeg' WHERE (`id` = '4');
UPDATE `art_pieces` SET `image` = 'IMG_7206.jpeg' WHERE (`id` = '5');
UPDATE `art_pieces` SET `image` = 'IMG_7203.jpeg' WHERE (`id` = '6');
UPDATE `art_pieces` SET `image` = 'ficar-por-ai.jpg' WHERE (`id` = '7');
UPDATE `art_pieces` SET `image` = 'o-pior-de-mim.jpg' WHERE (`id` = '8');
UPDATE `art_pieces` SET `image` = 'ApartedaVida.jpg' WHERE (`id` = '9');

UPDATE `authors` SET `image` = 'pedro_almeida.jpg' WHERE (`id` = '2');
UPDATE `authors` SET `image` = 'helena_caspurro.jpeg' WHERE (`id` = '1');
UPDATE `authors` SET `image` = 'jose_maria.jpg' WHERE (`id` = '3');
UPDATE `authors` SET `image` = 'francisco_providencia.jpg' WHERE (`id` = '4');
UPDATE `authors` SET `image` = 'antonio_valente.jpg' WHERE (`id` = '6');
UPDATE `authors` SET `image` = 'rui_ferro.jpg' WHERE (`id` = '23');
UPDATE `authors` SET `image` = 'sonia_teles.jpg' WHERE (`id` = '31');
UPDATE `authors` SET `image` = 'helena_barbosa.jpg' WHERE (`id` = '28');
UPDATE `authors` SET `image` = 'ines_guedes.jpg' WHERE (`id` = '18');
UPDATE `authors` SET `image` = 'ines_lamela.jpg' WHERE (`id` = '12');
UPDATE `authors` SET `image` = 'jose_emidio.jpg' WHERE (`id` = '27');
UPDATE `authors` SET `image` = 'mario_santos.jpg' WHERE (`id` = '26');
UPDATE `authors` SET `title` = 'criação musical e piano' WHERE (`id` = '3');
UPDATE `authors` SET `image` = 'carlos_silva.png' WHERE (`id` = '5');
UPDATE `authors` SET `image` = 'antonio_silva.png' WHERE (`id` = '7');
UPDATE `authors` SET `image` = 'joana-araujo.png' WHERE (`id` = '15');
UPDATE `authors` SET `image` = 'Nuno-Aragao.jpg' WHERE (`id` = '9');
UPDATE `authors` SET `image` = 'Brendan_Hemsworth.jpg' WHERE (`id` = '8');
UPDATE `authors` SET `image` = 'Antonio-Silva.jpg' WHERE (`id` = '7');
UPDATE `authors` SET `image` = 'isabel_calado.jpg' WHERE (`id` = '29');
UPDATE `authors` SET `name` = 'Tiago M. Soares', `image` = 'Tiago-Soares.jpg' WHERE (`id` = '36');
UPDATE `authors` SET `name` = 'Helena Rodrigues' WHERE (`id` = '35');
UPDATE `authors` SET `name` = 'Pedro Lima Pereira' WHERE (`id` = '42');
UPDATE `authors` SET `title` = 'criação, desenho ' WHERE (`id` = '4');
UPDATE `authors` SET `title` = 'Criação e animação, corealização de Vídeo ' WHERE (`id` = '5');
UPDATE `authors` SET `title` = 'Coprodução de vídeo' WHERE (`id` = '6');
UPDATE `authors` SET `title` = 'Masterização de som ' WHERE (`id` = '7');
UPDATE `authors` SET `title` = 'Criação, produção e mistura ' WHERE (`id` = '8');
UPDATE `authors` SET `title` = 'Captação e gravação de Som ' WHERE (`id` = '9');
UPDATE `authors` SET `title` = 'Captação e gravação de Som' WHERE (`id` = '10');
UPDATE `authors` SET `title` = 'Captação e gravação de Som' WHERE (`id` = '11');
UPDATE `authors` SET `title` = 'Intérprete, canto ' WHERE (`id` = '12');
UPDATE `authors` SET `title` = 'Intérprete, canto ' WHERE (`id` = '13');
UPDATE `authors` SET `title` = 'Intérprete, canto ' WHERE (`id` = '14');
UPDATE `authors` SET `title` = 'Intérprete, canto ' WHERE (`id` = '15');
UPDATE `authors` SET `title` = 'Criação, artes plásticas  ' WHERE (`id` = '18');
UPDATE `authors` SET `title` = 'Criação, escultura ' WHERE (`id` = '20');
UPDATE `authors` SET `title` = 'Criação, escultura ' WHERE (`id` = '23');
UPDATE `authors` SET `title` = 'Intérprete, saxofones ' WHERE (`id` = '26');
UPDATE `authors` SET `title` = 'Criação, pintura ' WHERE (`id` = '27');
UPDATE `authors` SET `title` = 'Criação, desenho ' WHERE (`id` = '28');
UPDATE `authors` SET `title` = 'Criação, fotografia ' WHERE (`id` = '29');
UPDATE `authors` SET `title` = 'Criação, pintura ' WHERE (`id` = '30');
UPDATE `authors` SET `title` = 'desenho, pintura e algário ' WHERE (`id` = '31');
UPDATE `authors` SET `title` = 'Intérprete, contrabaixo ' WHERE (`id` = '32');
UPDATE `authors` SET `title` = 'Fotografia e prefácio ' WHERE (`id` = '33');
UPDATE `authors` SET `title` = 'Criação, pintura ' WHERE (`id` = '34');
UPDATE `authors` SET `title` = 'Criação literária e intérprete ' WHERE (`id` = '35');
UPDATE `authors` SET `title` = 'Intérprete, percussão ' WHERE (`id` = '36');
UPDATE `authors` SET `title` = 'Criação, desenho e colagem ' WHERE (`id` = '37');
UPDATE `authors` SET `title` = 'Criação, pintura ' WHERE (`id` = '38');
UPDATE `authors` SET `title` = 'Criação e interpretação musical ' WHERE (`id` = '39');
UPDATE `authors` SET `title` = 'Intérprete, guitarra acústica ' WHERE (`id` = '41');
UPDATE `authors` SET `title` = 'Intérprete, guitarras ' WHERE (`id` = '42');
UPDATE `authors` SET `title` = 'Criação, pintura ' WHERE (`id` = '43');
UPDATE `authors` SET `image` = 'Alvaro-Sousa.png' WHERE (`id` = '44');

UPDATE `moments` SET `image` = 'moments1.jpg' WHERE (`id` = '1');
UPDATE `moments` SET `image` = 'moments2.jpg' WHERE (`id` = '2');
