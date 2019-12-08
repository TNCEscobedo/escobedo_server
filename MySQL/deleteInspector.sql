DROP PROCEDURE IF EXISTS deleteInspector;
DELIMITER //
CREATE PROCEDURE deleteInspector (IN input_idInspector INT)
BEGIN
DELETE FROM usuario
WHERE usuario.idUsuario= input_idInspector;

END //
DELIMITER ;